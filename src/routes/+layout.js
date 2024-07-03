import tools from './tools.json';

// @ts-ignore
export async function load({ route, url }) {
    return {
        tools: tools,
        meta: getMeta(route, url)
    };
}

// @ts-ignore
function getMeta(route, url) {
    if (route.id && route.id.includes("(tools)")) {
        // Get the path and log it
        const path = url.pathname.replace("/", "");
        // console.log("Path:", path);
        // console.log("Tools:", tools);

        // Get the tool
        let tool = tools[path];

        // Check if tool exists
        if (tool) {
            return {
                title: tool.name || "Default Title",
                description: tool.description || "Default Description",
                contributors: tool.contributors || "Default Contributors"
            };
        } else {
            // console.warn(`Tool not found for path: ${path}`);
        }
    }
    return {
        title: "Default Title",
        description: "Default Description",
        contributors: "Default Contributors"
    };
}
