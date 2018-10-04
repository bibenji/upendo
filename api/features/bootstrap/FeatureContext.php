<?php

use Behat\Behat\Context\Context;
use Behat\Behat\Context\SnippetAcceptingContext;
use Doctrine\Common\Persistence\ManagerRegistry;
use Doctrine\ORM\Tools\SchemaTool;
use Doctrine\Common\DataFixtures\Loader;
use Doctrine\Common\DataFixtures\Purger\ORMPurger;
use Doctrine\Common\DataFixtures\Executor\ORMExecutor;
use Behat\MinkExtension\Context\RawMinkContext;
use Behatch\Context\RestContext;
use Symfony\Component\DependencyInjection\Container;
use Doctrine\Common\Persistence\ObjectManager;


/**
 * Defines application features from the specific context.
 */
//class FeatureContext implements Context, SnippetAcceptingContext
class FeatureContext extends RawMinkContext implements Context, SnippetAcceptingContext
//class FeatureContext extends OwnerRestContext
{
    protected $apikey = '';

    /**
     * @var Container
     */
    private $container;

    /**
     * @var ManagerRegistry
     */
    private $doctrine;

    /**
     * @var ObjectManager
     */
    private $manager;

    /**
     * @var SchemaTool
     */
    private $schemaTool;

    /**
     * @var array
     */
    private $classes;

    private $request;

    /**
     * Initializes context.
     *
     * Every scenario gets its own context instance.
     * You can also pass arbitrary arguments to the
     * context constructor through behat.yml.
     */
    public function __construct(Container $container, ManagerRegistry $doctrine)
    {
        $this->container = $container;

        $this->doctrine = $doctrine;

        $this->manager = $doctrine->getManager();

        $this->schemaTool = new SchemaTool($this->manager);

        $this->classes = $this->manager->getMetadataFactory()->getAllMetadata();
    }

    /**
     * @BeforeScenario @createSchema
     */
    public function createDatabase()
    {
        $this->schemaTool->createSchema($this->classes);
    }

    /**
     * @AfterScenario @dropSchema
     */
    public function dropDatabase()
    {
        $this->schemaTool->dropSchema($this->classes);
    }

    /**
     * @Given the database is empty
     */
    public function theDatabaseIsEmpty()
    {
        $this->schemaTool->dropDatabase();
        $this->schemaTool->createSchema($this->classes);
    }

    /**
     * @Given data fixtures are loaded
     */
    public function dataFixturesAreLoaded()
    {
        $loader = new \Symfony\Bridge\Doctrine\DataFixtures\ContainerAwareLoader($this->container);
        $loader->loadFromDirectory(__DIR__ . '/../../src/DataFixtures');
        $executor = new ORMExecutor($this->manager);
        $executor->execute($loader->getFixtures(), true);
    }

    /**
     * @Given I am connected as normal user
     */
    public function iAmConnectedAsNormalUser()
    {
        $body = '{"username":"bibenji","password":"bibenji"}';

        $request = new \Behatch\HttpCall\Request($this->getMink());
        $request->setHttpHeader('Content-Type', 'application/json');
        $result = $request->send(
            'POST',
            $this->locatePath('/login'),
            [],
            [],
            $body,
            [
                'Content-Type' => 'application/json'
            ]
        );

        $currentUrl = $this->getSession()->getCurrentUrl();

        $content = json_decode($result->getContent(), true);

        $this->apikey = $content['apikey'];


    }

    /**
     * Fills in form field with specified id|name|label|value.
     * @param string $field
     */
    protected function fillField($field, $value)
    {
        $this
            ->getSession()
            ->getPage()
            ->fillField(
                $this->fixStepArgument($field),
                $this->fixStepArgument($value)
            )
        ;
    }

    /**
     * Returns fixed step argument (with \\" replaced back to ").
     *
     * @param string $argument
     *
     * @return string
     */
    protected function fixStepArgument($argument)
    {
        return str_replace('\\"', '"', $argument);
    }

    /**
     * @When I send a :arg1 request to :arg2 with parameter for identification
     */
    public function iSendARequestToWithParameterForIdentification($arg1, $arg2)
    {
        if ($this->apikey !== '') {
            $arg2 .= '?apikey='.$this->apikey;
        }
        $this->iSendARequestToOwner($arg1, $arg2);
    }

    /**
     * Sends a HTTP request
     */
    private function iSendARequestToOwner($method, $url, $files = [], $body = null)
    {
        $request = new \Behatch\HttpCall\Request($this->getMink());
        $request->setHttpHeader('Content-Type', 'application/json');

        return $request->send(
            $method,
            $this->locatePath($url),
            [],
            $files,
            $body !== null ? $body->getRaw() : null
        );

    }
}
