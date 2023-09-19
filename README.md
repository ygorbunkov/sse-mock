## What is this?
Lightweight SSE mock-server configurable "on the fly" through the interactive CLI-prompt

## Who is this for?
Front-end developers who might need to mock responses from the actual back-end with the data of their choice or whoever else who might find this useful

## How do I use it?
1. Clone the repo
```bash
git clone https://github.com/ygorbunkov/sse-mock.git
```
2. Install the dependencies
```bash
yarn install
```
3. Configure the environment (set necessary parameters within .env file)
4. Create JSON-files in response directory (/src/response, by default) that will be used as a mock-data for Server Sent Events
5. Start the server
```bash
yarn start
```
6. When prompt is available in the terminal go to 'Configure endpoint subscription response'
7. Specify route path (part that comes after root prefix) for your mock endpoint (e.g. /status-event to get http://localhost:3000/sse/status-event)
8. Pick JSON-file from the list (it will be used as a data source for SSE)
9. Whenever you need to push SSE event to the client hit 'Push Server Sent Event to the client' in the prompt
10. Once you're done using the app hit 'Exit'

## Can I use it without setting up Node.js environment?
Yes. However, you might need Docker Engine and Docker Compose for that.

You may either clone the repo (as suggested above), build Docker image locally and run it
```bash
docker-compose run ssemock
```
Or you may spin the latest image from the [Dockerhub](https://hub.docker.com/r/ygorbunkov/ssemock)

**_Note:_** by default, your local ./response directory will be mounted as a Docker volume to ssemock container to host JSON-files with mock responses
