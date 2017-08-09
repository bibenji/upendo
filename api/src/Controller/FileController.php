<?php

namespace Upendo\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Upendo\Entity\Photo;
use Ramsey\Uuid\Uuid;

class FileController extends Controller
{    
    public function uploadAction(Request $request)
    {
		$em = $this->getDoctrine()->getManager();
		$user = $this->getUser();
		
		$uploadedFiles = [];
		
		foreach($request->files->all() as $file) {

            $fileData = [];
			
			$newFileName = Uuid::uuid4()->toString() . '.' . $file->getClientOriginalExtension();

            $fileData['relativePathFile'] = $this->getParameter('profiles_uploads') . $user->getId() . '/' . $newFileName;
            $fileData['absolutePathDir'] = $this->getParameter('profiles_uploads_full_path') . $user->getId();

            $result = $file->move(
                $fileData['absolutePathDir'],
                $newFileName
            );
			
			$photo = new Photo();
			$photo->setUser($user);
			$photo->setPath($fileData['relativePathFile']);
			$em->persist($photo);
			
			$uploadedFiles[] = [
				"upload" => $result,
				"fileName" => $file->getClientOriginalName(),
				"id" => $photo->getId(),
				"path" => $fileData['relativePathFile']
			];

			// $user->addPhoto;

            // chmod($fileData['fullPath'], 0777);
            // chmod($fileData['fullPathFile'], 0777);
			
        }
		
		$em->flush();
		
		return new JsonResponse($uploadedFiles);
    }
}