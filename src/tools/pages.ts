type Page = {
  id: string;
  name: string;
};

type Notebook = {
  id: string;
  name: string;
  pages: Page[];
};

let notebooks: Notebook[] //get data from notion API;

export async function listNotebooks() {
  //iterate over notebooks and return the name of each one
  const theNotebooks = notebooks.map((notebook) => {
    return {
      name: notebook.name,
      id: notebook.id,
    };
  });
  return {
    notebooks: theNotebooks,
  };
}

export async function listPages(args: { notebook: string }) {
  //iterate notebooks, find the one with the name passed as argument and return its pages
  const notebook = args.notebook.toLowerCase();
  const theNotebook = notebooks.find((n) => n.name.toLowerCase() === notebook);
  if (!theNotebook) return "Notebook not found";

  const pages = theNotebook.pages.map((page) => page.name);
  return {
    notebook: theNotebook.name,
    pages,
  };
}

export async function createPage(args: { notebook: string; pageName: string }) {
  const notebook = args.notebook.toLowerCase();
  const pageName = args.pageName;

  const theNotebook = notebooks.find((n) => n.name.toLowerCase() === notebook);
  if (!theNotebook) return "Notebook not found";

  const newPage = { id: "4", name: pageName, pages: [] };
  theNotebook.pages.push(newPage);
  return "Page " + pageName + " created successfully! in notebook " + notebook;
}