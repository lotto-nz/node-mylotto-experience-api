if [ -n "$(docker container ls -q --filter 'name=experience-api')" ]; then
    echo "Killing experience-api container"
    docker kill swagger-ui
fi

docker build -t lottonz/experience-api:1.0.0 -t lottonz/experience-api:latest -f docker/experience-api.Dockerfile . && \
    docker run --detach --rm -p 8080:8080 --name experience-api lottonz/experience-api:latest && \
    echo "Experience API is running on http://localhost:8080"

