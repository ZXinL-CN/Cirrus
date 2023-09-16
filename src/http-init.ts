import { createServer, IncomingMessage, Server, ServerResponse } from 'node:http';

interface Page {
    page(response: ServerResponse): void;
}

class First implements Page {
    page(response: ServerResponse): void {
        response.end('I am a first page');
    }
}

class Root implements Page {
    page(response: ServerResponse): void {
        response.end('I am the root page');
    }
}

const router = new Map<string, Page>();
router.set("/first", new First());
router.set("/root", new Root());

const server = createServer((request: IncomingMessage, response: ServerResponse) => {
    console.log(request.url);
    let page = router.get(request.url === undefined ? "" : request.url);
    if (page === undefined) {
        page = new Root();
    }
    page.page(response);
}).listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
})