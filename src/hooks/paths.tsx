import { Calendar, Chat, Clients, ClientsMore, CreateClient, CreateCreadit, CreateExample, CreditMore, EditDetails, ExampleMessages, Help, HistoryPayments, Home, Login, NotFound, Settings } from "../pages"


export const paths = {
    home: "/",
    login: "/login",
    calendar: "/calendar",
    clients: "/clients",
    clientsMore: "/clients/:id",
    createClient: "/clients/create",
    credits: "/credits",
    creditsMore: "/credits/:id",
    creditscreate: "/credits/create",
    exampleMessages: "/examples",
    createExample: "/examples/create",
    settings: "/settings",
    editDetails: "/settings/edit",
    help: "/settings/help",
    historyPayments: "/history/payments",
    messages: "/history/messages",
    notFound: "*"
}
export const RoutesList = [
    {
        id: 1,
        path: paths.home,
        element: <Home/>
    },
    {
        id: 2,
        path: paths.login,
        element: <Login/>
    },
    {
        id: 3,
        path: paths.clients,
        element: <Clients/>
    },
    {
        id: 4,
        path: paths.calendar,
        element: <Calendar/>
    },
    {
        id: 5,
        path: paths.createClient,
        element: <CreateClient/>
    },
    {
        id: 6,
        path: paths.clientsMore,
        element: <ClientsMore/>
    },
    {
        id: 7,
        path: paths.creditsMore,
        element: <CreditMore/>
    },
    {
        id: 8,
        path: paths.creditscreate,
        element: <CreateCreadit/>
    },
    {
        id: 9,
        path: paths.historyPayments,
        element: <HistoryPayments/>
    },
    {
        id: 10,
        path: paths.messages,
        element: <Chat/>
    },
    {
        id: 11,
        path: paths.messages,
        element: <Chat/>
    },
    {
        id: 12,
        path: paths.exampleMessages,
        element: <ExampleMessages/>
    },
    {
        id: 13,
        path: paths.createExample,
        element: <CreateExample/>
    },
    {
        id: 14,
        path: paths.settings,
        element: <Settings/>
    },
    {
        id: 15,
        path: paths.editDetails,
        element: <EditDetails/>
    },
    {
        id: 15,
        path: paths.help,
        element: <Help/>
    },
    {
        id: 16,
        path: paths.notFound,
        element: <NotFound/>
    },
]


