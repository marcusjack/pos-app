import { createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw } from "vue-router";
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
import Request from "./components/sales/Request.vue";
import RequestDetail from "./components/sales/RequestDetail.vue";
import ZeroOrder from "./components/admin/ZeroOrder.vue";
import { store } from "./store";

function salesStaff(from: RouteLocationNormalized,to: RouteLocationNormalized,next: NavigationGuardNext){
  const allowedRoles = ['SALES_STAFF','ADMIN','SUPER_ADMIN','VENDOR'];
  const role = store.getters.getUser? store.getters.user_type:'';
  if(role!=null && role!='' && allowedRoles.includes(role)){
    next();
  }else{
    next('/404');
  }
}


function admin(from: RouteLocationNormalized,to: RouteLocationNormalized,next: NavigationGuardNext){
  const allowedRoles = ['ADMIN','SUPER_ADMIN','VENDOR'];
  const role = store.getters.getUser? store.getters.user_type:'';
  if(role!=null && role!='' && allowedRoles.includes(role)){
    next();
  }else{
    next('/404');
  }
}

function superAdmin(from: RouteLocationNormalized,to: RouteLocationNormalized,next: NavigationGuardNext){
  const allowedRoles = ['SUPER_ADMIN'];
  const role = store.getters.getUser? store.getters.user_type:'';
  if(role!=null && role!='' && allowedRoles.includes(role)){
    next();
  }else{
    next('/404');
  }
}



export enum MutationTypes {
  ORDER = 'Order',
  ADMIN_ORDER = 'AdminOrder',
  OrdersList = "OrdersList",
  OrderDetails = "OrderDetails",
  Report = "Report",
  EditOrder = "EditOrder",
  Product= 'Product',
  EditProduct='EditProduct',
  Batch='Batch',
  User='User',
  CreateProduct='CreateProduct',
  EditUser='EditUser',


}

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Order",
    component: Order,
  },
  {
    path: "/admin/order",
    name: "AdminOrder",
    component: ZeroOrder,
    beforeEnter:admin,
  },
  {
    path: "/orders",
    name: "OrdersList",
    component: OrdersList,
    beforeEnter:salesStaff
  },
  {
    path: "/orders/:orderId",
    name: "OrderDetails",
    component: EditOrder,
    props: true,
    beforeEnter:salesStaff
  },
  {
    path: "/report",
    name: "Report",
    component: Report,
    beforeEnter:superAdmin,
  },
  {
    path: "/editorder",
    name: "EditOrder",
    component: EditOrder,
    beforeEnter:salesStaff,
  },
  {
    path: "/products",
    name: "Product",
    component: Product,
    beforeEnter:salesStaff,

  },
  {
    path: "/product/edit/:productId",
    name: "EditProduct",
    component: AddEditProduct,
    props: true,
    beforeEnter:admin,
  },
  {
    path: "/batchs",
    name: "Batch",
    component: Batch,
    beforeEnter:admin,
  },
  {
    path: "/users",
    name: "User",
    component: User,
    beforeEnter:admin,
  },
  {
    path: "/product/create",
    name: "CreateProduct",
    component: AddEditProduct,
    beforeEnter:admin,
  },
  {
    path: "/batch/create",
    name: "",
    component: AddEditBatch,
    beforeEnter:admin,
  },
  {
    path: "/batch/edit/:productId/:productVariantId/:batchId",
    name: "EditBatch",
    component: AddEditBatch,
    props: true,
    beforeEnter:admin,
  },
  {
    path: "/user/create",
    name: "",
    component: AddEditUser,
    beforeEnter:admin,
  },
  {
    path: "/user/edit/:userId",
    name: "EditUser",
    component: AddEditUser,
    props: true,
    beforeEnter:admin,
  },
  {
    path: "/admin/order",
    name: "adminOrder",
    component: Order,
    beforeEnter:admin,
  },
  {
    path: "/departments",
    name: "department",
    component: Department,
    beforeEnter:admin,
  },
  {
    path: "/department/create",
    name: "CreateDepartment",
    component: DepartmentAddEdit,
    beforeEnter: admin,
  },
  {
    path: "/department/edit/:companyId",
    name: "EditDepartment",
    component: DepartmentAddEdit,
    props: true,
    beforeEnter:admin,
  },
  {
    path: "/vendors",
    name: "Vendor",
    component: Vendor,
    beforeEnter:admin,
  },
  {
    path: "/vendor/create",
    name: "CreateVendor",
    component: VendorAddEdit,
    beforeEnter:admin,
  },
  {
    path: "/vendor/edit/:vendorId",
    name: "EditVendor",
    component: VendorAddEdit,
    props: true,
    beforeEnter:admin,
  },
  {
    path: '/settings',
    name: "Settings",
    component: Settings,
    beforeEnter:admin,
  },
  { path: '/404', name: 'notFound', component: NotFound },  
  { path: '/:catchAll(.*)', redirect: '/404' },
  {
    path: '/requests',
    name: "Request",
    component: Request,
    beforeEnter:admin,
  },
  {
    path: '/requests/:id',
    name: "RequestDetail",
    component: RequestDetail,
    beforeEnter:admin,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;