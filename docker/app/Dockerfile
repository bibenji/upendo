FROM ikimea/php7.1

#COPY ./ $PROJECT_ROOT

RUN if [ "$CHOWN" != "no" ]; then chown ikimea:ikimea -R . ; fi

#COPY ./docker/app/docker-entrypoint.d/*.sh /docker-entrypoint.d/

USER ikimea

