import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Report from "./components/sales/Report.vue";
import Order from "./components/sales/Order.vue";
import OrdersList from "./components/sales/OrdersList.vue";
import EditOrder from "./components/sales/EditOrder.vue";
import Product from "./components/sales/Product.vue";
import Batch from "./components/sales/Batch.vue";
import User from "./components/sales/User.vue";
import AddEditProduct from "./components/sales/AddEditProduct.vue";
import AddEditBatch from "./components/sales/AddEditBatch.vue";
import AddEditUser from "./components/sales/AddEditUser.vue";
import Department from "./components/admin/Department.vue";
import DepartmentAddEdit from "./components/admin/DepartmentAddEdit.vue";
import Vendor from "./components/admin/Vendor.vue";
import VendorAddEdit from "./components/admin/VendorAddEdit.vue";
import NotFound from "./components/common-components/NotFound.vue";
import Settings from "./components/common-components/Settings.vue";
import Notifications from "./components/common-components/Notifications.vue";
import Request from "./components/sales/Request.vue";
import RequestDetail from "./components/sales/RequestDetail.vue";
import Response from "./components/sales/Response.vue";
import ZeroOrder from "./components/admin/ZeroOrder.vue";
import Inventory from "./components/admin/Inventory.vue";
import ExpenseSummary from "./components/admin/ExpenseSummary.vue";
import ConnectionError from "./components/common-components/ConnectionError.vue"
import Expense from "./components/admin/Expense.vue";
import Login from './components/auth/Login.vue';
import { redirectToAdmin, superAdmin, storeAdmin, manager, checkConnection } from  '@/permissions';
import { store } from '@/store';
import { ActionTypes } from '@/store/modules/auth/actions'
import Basic from '@/components/analytics/Basic.vue';
import OrderAnaltyics from '@/components/analytics/Order.vue';
import FinanceAnaltyics from '@/components/analytics/Finance.vue';
import InventoryAnaltyics from '@/components/analytics/Inventory.vue';
import StockStatement from '@/components/analytics/StockStatement.vue';
import TotalReceivable from '@/components/analytics/TotalReceivable.vue';
import DayTotalPayable from '@/components/analytics/DayTotalPayable.vue';
import OperatorSalesDetail from '@/components/analytics/Sales_Detail.vue';
import ProfifLossReport from '@/components/analytics/Report.vue';
import EndOfDay from '@/components/analytics/EndOfDay.vue';
import ComparisonAnalysis from '@/components/analytics/ComparisonAnalysis.vue';


const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Order",
    component: Order,
    beforeEnter: redirectToAdmin
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    beforeEnter: (to, from, next) => {
      if ('token' in localStorage) {
        next('/');
      } else {
        next();
      }
    }
  },
  {
    path: '/logout',
    name: 'logout',
    component: {
      template: '<h1>logout</h1>'
    },
    beforeEnter: (to, form, next) => {
      store.dispatch(ActionTypes.LOGOUT_USER);
      next('/login')
    }
  },
  {
    path: "/admin/order",
    name: "AdminOrder",
    component: ZeroOrder,
    beforeEnter: storeAdmin,
  },
  {
    path: "/orders",
    name: "OrdersList",
    component: OrdersList,
    beforeEnter: manager
  },
  {
    path: "/orders/:orderId",
    name: "OrderDetails",
    component: EditOrder,
    props: true,
    beforeEnter: manager
  },
  {
    path: "/report",
    name: "Report",
    component: Report,
    beforeEnter: superAdmin,
  },
  {
    path: "/editorder",
    name: "EditOrder",
    component: EditOrder,
    beforeEnter: storeAdmin,
  },
  {
    path: "/products",
    name: "Product",
    component: Product,
    beforeEnter: storeAdmin,

  },
  {
    path: "/product/edit/:productId",
    name: "EditProduct",
    component: AddEditProduct,
    props: true,
    beforeEnter: storeAdmin,
  },
  {
    path: "/batchs",
    name: "Batch",
    component: Batch,
    beforeEnter: storeAdmin,
  },
  {
    path: "/users",
    name: "User",
    component: User,
    beforeEnter: storeAdmin,
  },
  {
    path: "/product/create",
    name: "CreateProduct",
    component: AddEditProduct,
    beforeEnter: storeAdmin,
  },
  {
    path: "/batch/edit/:productId/:productVariantId/:batchId",
    name: "EditBatch",
    component: AddEditBatch,
    props: true,
    beforeEnter: storeAdmin,
  },
  {
    path: "/Addbatch",
    name: "AddBatch",
    component: AddEditBatch,
    props: true,
    beforeEnter: storeAdmin,
  },
  {
    path: "/user/create",
    name: "",
    component: AddEditUser,
    beforeEnter: storeAdmin,
  },
  {
    path: "/user/edit/:userId",
    name: "EditUser",
    component: AddEditUser,
    props: true,
    beforeEnter: storeAdmin,
  },
  {
    path: "/departments",
    name: "department",
    component: Department,
    beforeEnter: storeAdmin,
  },
  {
    path: "/department/create",
    name: "CreateDepartment",
    component: DepartmentAddEdit,
    beforeEnter: storeAdmin,
  },
  {
    path: "/department/edit/:companyId",
    name: "EditDepartment",
    component: DepartmentAddEdit,
    props: true,
    beforeEnter: storeAdmin,
  },
  {
    path: "/vendors",
    name: "Vendor",
    component: Vendor,
    beforeEnter: storeAdmin,
  },
  {
    path: "/vendor/create",
    name: "CreateVendor",
    component: VendorAddEdit,
    beforeEnter: storeAdmin,
  },
  {
    path: "/vendor/edit/:vendorId",
    name: "EditVendor",
    component: VendorAddEdit,
    props: true,
    beforeEnter: storeAdmin,
  },
  {
    path: '/settings',
    name: "Settings",
    component: Settings,
    beforeEnter: superAdmin,
  },
  { path: '/404', name: 'notFound', component: NotFound },  
  { path: '/:pathMatch(.*)*', redirect: '/404' },
  {
    path: '/request',
    name: "Request",
    component: Request,
    beforeEnter: manager,
  },
  {
    path: '/requests/:id',
    name: "RequestDetail",
    component: RequestDetail,
    beforeEnter: manager,

  },
  {
    path: '/inventory',
    name: "Inventory",
    component: Inventory,
    beforeEnter: manager
  },
  {
    path: '/expense-summary',
    name: 'ExpenseSummary',
    component: ExpenseSummary,
    beforeEnter: manager

  },
  {
    path: '/expense',
    name: 'expense',
    component: Expense,
    beforeEnter: manager
  },
  {
    path: '/response',
    name: "Response",
    component: Response,
    beforeEnter: manager
  },
  {
    path: '/notification',
    name: "Notificaiton",
    component: Notifications
  },
  {
    path: '/connection',
    name: "Connection",
    component: ConnectionError
  },
  {
    path: '/analytics',
    name: "analytics",
    component: Basic,
    beforeEnter: manager,
    children: [
      {
        path: 'order',
        name: 'order-analytics',
        component: OrderAnaltyics,
      },
      {
        path: 'inventory',
        name: 'inventory-analytics',
        component: InventoryAnaltyics,
      },
      {
        path: 'Stock',
        name: 'StockStatement',
        component: StockStatement,
      },
      {
        path: 'TotalReceivable',
        name: 'TotalReceivable',
        component: TotalReceivable,
      },
      {
        path: 'dayTotalPayable',
        name: 'DayTotalPayable',
        component: DayTotalPayable,
      },
      {
        path: 'detail',
        name: 'operator-sales-detail',
        component: OperatorSalesDetail,
      },
      {
        path: 'report',
        name: 'profit-loss-report',
        component: ProfifLossReport,
      },
      {
        path: 'eod',
        name: 'end-of-day',
        component: EndOfDay,
      },
      {
        path: 'comparisonAnalysis',
        name: 'ComparisonAnalysis',
        component: ComparisonAnalysis,
      },
    ]
  },
  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach(checkConnection);

export default router;