const API = {
  MasterCategory: {
    get: "adminmastercategories/adminmastercategories",
    getNested: "adminmastercategories/getnestedmastercategory",
    create: "adminmastercategories/createadminmastercategory",
    edit: "adminmastercategories/updateadminmastercategory",
    delete: "adminmastercategories/deleteadminmastercategory/",
  },
  Category: {
    get: "admincategories/getadmincategories",
    create: "admincategories/createadmincategory",
    edit: "admincategories/updateadmincategory",
    delete: "admincategories/deleteadmincategory/",
  },
  SubCategories: {
    get: "AdminSubcategories/GetAdminSubCategories",
    create: "AdminSubcategories/CreateAdminSubCategory",
    edit: "AdminSubcategories/UpdateAdminSubCategory",
    delete: "AdminSubcategories/DeleteAdminSubCategory/",
  },
  MicroCategories: {
    get: "AdminMicrocategories/GetAdminMicroCategories",
    create: "AdminMicrocategories/CreateAdminMicroCategory",
    edit: "AdminMicrocategories/UpdateAdminMicroCategory",
    delete: "AdminMicrocategories/DeleteAdminMicroCategory/",
  },
  LocationCategories: {
    get: "AdminLocationcategories",
    create: "AdminLocationcategories/CreateAdminLocationCategory",
    edit: "",
    delete: "AdminLocationcategories/",
  },
  State: "AdminStates",
  City: {
    get: "cities",
    Getcitiesbasedoncounty: "admincounties/Getcitiesbasedoncounty?id=",
  },
  counties: {
    get: "admincounties/getcounties",
    Getcountybasedonstate: "admincounties/getcountiesbasedonstate?id=",
  },
  BGCheck: {
    get: "adminlocationsbgcheck/getadminlocationsbgcheck",
  },
};
export default API;
