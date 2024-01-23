type Page = {
    id: string;
    name: string;
  };
  
  type Notebook = {
    id: string;
    name: string;
    pages: Page[];
  };
  
  const notebooks: Notebook[] = [
    {
      id: "1",
      name: "Viagens",
      pages: [
        {
          id: "1",
          name: "Chicago",
        },
        {
          id: "2",
          name: "Tokyo",
        },
        {
          id: "3",
          name: "Paris",
        },
      ],
    },
    {
      id: "2",
      name: "Receitas",
      pages: [
        {
          id: "1",
          name: "Bolo de chocolate",
        },
        {
          id: "2",
          name: "Pão de queijo",
        },
        {
          id: "3",
          name: "Pudim",
        },
      ],
    },
    {
      id: "3",
      name: "Compras",
      pages: [
        {
          id: "1",
          name: "Mercado",
        },
        {
          id: "2",
          name: "Farmácia",
        },
        {
          id: "3",
          name: "Shopping",
        },
      ],
    },
  ];
  
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