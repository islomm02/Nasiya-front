import { Calendar, Chat, Clients, ClientsMore, CreateClient, CreateCreadit, CreateExample, CreditMore, EditDetails, ExampleMessages, Help, HistoryPayments, Home, Login, NotFound, Report, Settings } from "../pages"
import AboutApp from "../pages/AboutApp"
import ChatCreate from "../pages/ChatCreate"
import ClientsEdit from "../pages/ClientEdit"
import CreditEdit from "../pages/CreditEdit"
import ExampleEdit from "../pages/ExampleEdit"
import Excition from "../pages/excition"
import PayBalance from "../pages/PayBalance"
import Profile from "../pages/Profile"
import ReportMore from "../pages/ReportMore"
import Suggestions from "../pages/Suggestions"


export const paths = {
    home: "/",
    login: "/login",
    profile: "/profile",
    calendar: "/calendar",
    clients: "/clients",
    clientsMore: "/clients/:id",
    createClient: "/clients/create",
    credits: "/credits",
    creditsMore: "/credits/:id",
    clientEdit: "/clients/:id/edit",
    creditsEdit: "/credits/:id/edit",
    creditscreate: "/credits/create/:id",
    exampleMessages: "/examples",
    exampleMessagesEdit: "/examples/edit/:id",
    createExample: "/examples/create",
    settings: "/settings",
    aboutApp: "/about-app",
    editDetails: "/settings/edit",
    help: "/settings/help",
    historyPayments: "/history/payments",
    messages: "/history/messages",
    payBalance: "/pay-balance",
    excition: "/excition/:id",
    report: "/report",
    suggestions: "/suggestions",
    reportMore: "/report/:id",
    createChat: "/chat/create",
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
        path: paths.payBalance,
        element: <PayBalance/>
    },
    {
        id: 17,
        path: paths.excition,
        element: <Excition/>
    },
    {
        id: 18,
        path: paths.report,
        element: <Report/>
    },
    {
        id: 19,
        path: paths.creditsEdit,
        element: <CreditEdit/>
    },
    {
        id: 20,
        path: paths.reportMore,
        element: <ReportMore/>
    },
    {
        id: 21,
        path: paths.createChat,
        element: <ChatCreate/>
    },
    {
        id: 22,
        path: paths.exampleMessagesEdit,
        element: <ExampleEdit/>
    },
    {
        id: 23,
        path: paths.profile,
        element: <Profile/>
    },
    {
        id: 24,
        path: paths.suggestions,
        element: <Suggestions/>
    },
    {
        id: 25,
        path: paths.aboutApp,
        element: <AboutApp/>
    },
    {
        id: 26,
        path: paths.clientEdit,
        element: <ClientsEdit/>
    },
    {
        id: 27,
        path: paths.notFound,
        element: <NotFound/>
    },
]


