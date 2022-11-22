"use strict";
exports.id = 219;
exports.ids = [219];
exports.modules = {

/***/ 182:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "z3": () => (/* binding */ DepartmentLoading1),
/* harmony export */   "bX": () => (/* binding */ DepartmentProvider),
/* harmony export */   "Qd": () => (/* binding */ useDepartment)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _models_Department__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(374);
/* harmony import */ var _models_Stream__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(963);
/* harmony import */ var _utils_axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(645);

/*

A provider for all department services

Services 
    - Add department
    - Get all departments
    - Get a department
    - Update a department
    - Delete a department

States to handle
    - List of departments
    - A selected department
    - Loading states for ( ENUM -- fetching, adding, updating, deleting )
    - Error states with a string ( CONST -- Failed to fetch departments, Failed to add, failed to update, failed to delete )

*/ 



var DepartmentLoading1;

(function(DepartmentLoading) {
    DepartmentLoading["FetchingAllDepartments"] = "fetching all departments";
    DepartmentLoading["AddingDepartment"] = "adding department";
    DepartmentLoading["UpdatingDepartment"] = "updating department";
    DepartmentLoading["DeletingDepartment"] = "deleting department";
    DepartmentLoading["UPDATING_DEPARTMENT"] = "updating department";
    DepartmentLoading["AddingStream"] = "adding stream";
    DepartmentLoading["UpdatingStream"] = "updating stream";
    DepartmentLoading["DeletingStream"] = "deleting stream";
})(DepartmentLoading1 || (DepartmentLoading1 = {
}));
//URL
const DEPARTMENT_URL = {
    DEV: "/departments"
};
//Errors
const ErrFetchingDepartments = "Failed to fetch departments";
const ErrAddingDepartment = "Failed to add department";
const ErrUpdatingDepartment = "Failed to update department";
const DEPARTMENT_CONTEXT = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({
    departments: null,
    department: null,
    loading: null,
    error: null,
    setError: (v)=>{
    },
    AddDepartment: (department, successCallback, failCallback)=>{
    },
    GetDepartments: ()=>{
    },
    GetDepartment: (v)=>{
    },
    UpdateDepartment: (department, successCallback, failCallback)=>{
    },
    DeleteDepartment: (id, successCallback, failCallback)=>{
    },
    AddStream: (stream, successCallback, failCallback)=>{
    },
    UpdateStream: (stream, successCallback, failCallback)=>{
    },
    DeleteStream: (id, successCallback, failCallback)=>{
    }
});
const DepartmentProvider = ({ children  })=>{
    const { 0: departments , 1: setDepartments  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
    const { 0: department1 , 1: setDepartment  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
    const { 0: loading , 1: setLoading  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
    const { 0: error1 , 1: setError  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        GetDepartments();
    }, []);
    const AddDepartment = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (department, successCallback, failCallback)=>{
        try {
            setError(null);
            setLoading(DepartmentLoading1.AddingDepartment);
            const _res = await _utils_axios__WEBPACK_IMPORTED_MODULE_4__/* .axios.post */ .o.post(DEPARTMENT_URL.DEV, (0,_models_Department__WEBPACK_IMPORTED_MODULE_2__/* .DepartmentToJSON */ .m)(department));
            setDepartments((prev)=>{
                return [
                    ...prev,
                    (0,_models_Department__WEBPACK_IMPORTED_MODULE_2__/* .DepartmentFromJSON */ .H)(_res.data)
                ];
            });
            setLoading(null);
            successCallback();
        } catch (error) {
            console.log(error);
            setError(ErrAddingDepartment);
            setLoading(null);
            failCallback();
        }
    }, []);
    const GetDepartments = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        try {
            setError(null);
            setLoading(DepartmentLoading1.FetchingAllDepartments);
            const _res = await _utils_axios__WEBPACK_IMPORTED_MODULE_4__/* .axios.get */ .o.get(DEPARTMENT_URL.DEV);
            setDepartments(_res.data.map((e)=>(0,_models_Department__WEBPACK_IMPORTED_MODULE_2__/* .DepartmentFromJSON */ .H)(e)
            ));
            setLoading(null);
        } catch (error) {
            console.log(error);
            setError(ErrFetchingDepartments);
            setLoading(null);
        }
    }, []);
    const GetDepartment = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
    }, []);
    const UpdateDepartment = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (department, successCallback, failCallback)=>{
        try {
            setError(null);
            setLoading(DepartmentLoading1.UPDATING_DEPARTMENT);
            department.Head.Address.HouseNo = "";
            console.log((0,_models_Department__WEBPACK_IMPORTED_MODULE_2__/* .DepartmentToJSON */ .m)(department));
            const _res = await _utils_axios__WEBPACK_IMPORTED_MODULE_4__/* .axios.patch */ .o.patch(DEPARTMENT_URL.DEV, (0,_models_Department__WEBPACK_IMPORTED_MODULE_2__/* .DepartmentToJSON */ .m)(department));
            console.log(_res);
            console.log((0,_models_Department__WEBPACK_IMPORTED_MODULE_2__/* .DepartmentFromJSON */ .H)(_res.data));
            setDepartments((prev)=>[
                    ...prev.map((e)=>{
                        if (e.ID == department.ID) {
                            return (0,_models_Department__WEBPACK_IMPORTED_MODULE_2__/* .DepartmentFromJSON */ .H)(_res.data);
                        }
                        return e;
                    }), 
                ]
            );
            setLoading(null);
            successCallback();
        } catch (error) {
            console.log(error);
            setError(ErrUpdatingDepartment);
            setLoading(null);
            failCallback();
        }
    }, []);
    const DeleteDepartment = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (departmentId, successCallback, failCallback)=>{
        try {
            setError(null);
            setLoading(DepartmentLoading1.DeletingDepartment);
            await _utils_axios__WEBPACK_IMPORTED_MODULE_4__/* .axios["delete"] */ .o["delete"](DEPARTMENT_URL.DEV + `?id=${departmentId}`);
            setDepartments((prev)=>[
                    ...prev.filter((e)=>e.ID != departmentId
                    )
                ]
            );
            setLoading(null);
            !!successCallback && successCallback();
        } catch (error) {
            if (!!error.response) {
                setError(error.response.data);
            } else {
                setError("Failed to delete department");
            }
            setLoading(null);
            !!failCallback && failCallback();
        }
    }, []);
    const AddStream = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (stream, successCallback, failCallback)=>{
        try {
            setError(null);
            setLoading(DepartmentLoading1.AddingStream);
            const _res = await _utils_axios__WEBPACK_IMPORTED_MODULE_4__/* .axios.post */ .o.post("/streams", (0,_models_Stream__WEBPACK_IMPORTED_MODULE_3__/* .StreamToJSON */ .L)(stream));
            await GetDepartments();
            !!successCallback && successCallback();
            setLoading(null);
        } catch (error) {
            if (!!error.response) {
                setError(error.response.data);
            } else {
                setError("Failed to add stream");
            }
            setLoading(null);
            !!failCallback && failCallback();
        }
    }, []);
    const UpdateStream = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (stream, successCallback, failCallback)=>{
        try {
            setError(null);
            setLoading(DepartmentLoading1.UpdatingStream);
            const _res = await _utils_axios__WEBPACK_IMPORTED_MODULE_4__/* .axios.patch */ .o.patch("streams", (0,_models_Stream__WEBPACK_IMPORTED_MODULE_3__/* .StreamToJSON */ .L)(stream));
            await GetDepartments();
            setLoading(null);
            successCallback();
        } catch (error) {
            console.log(error);
            setError("Error updating stream");
            setLoading(null);
            failCallback();
        }
    }, []);
    const DeleteStream = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (streamId, successCallback, failCallback)=>{
        try {
            setError(null);
            setLoading(DepartmentLoading1.DeletingStream);
            await _utils_axios__WEBPACK_IMPORTED_MODULE_4__/* .axios["delete"] */ .o["delete"]("streams" + `?id=${streamId}`);
            await GetDepartments();
            setLoading(null);
            !!successCallback && successCallback();
        } catch (error) {
            if (!!error.response) {
                setError(error.response.data);
            } else {
                setError("Failed to delete stream");
            }
            setLoading(null);
            !!failCallback && failCallback();
        }
    }, []);
    const _contextValue = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>({
            departments,
            department: department1,
            loading,
            error: error1,
            setError,
            AddDepartment,
            GetDepartments,
            GetDepartment,
            UpdateDepartment,
            DeleteDepartment,
            AddStream,
            UpdateStream,
            DeleteStream
        })
    , [
        departments,
        department1,
        loading,
        error1
    ]);
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(DEPARTMENT_CONTEXT.Provider, {
        value: _contextValue,
        children: children
    }));
};
const useDepartment = ()=>(0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(DEPARTMENT_CONTEXT)
;


/***/ }),

/***/ 566:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "v": () => (/* binding */ DropDown)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


const DropDown = ({ options =[] , label , placeholder ="" , refs ={
} , error , onChange =(v)=>{
} , defaultValue , styles ={
} , multiple =false , size =0  })=>{
    return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        style: {
            ...styles
        },
        className: "drop-down",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: `drop-down__label ${!!error && "drop-down__label--error"}`,
                children: label
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
                style: {
                    height: size == 0 ? "4rem" : "auto"
                },
                defaultValue: defaultValue && defaultValue,
                multiple: multiple,
                size: size,
                onChange: (v)=>{
                    console.log("olla", v.target.value);
                    onChange(v.target.value);
                },
                ...refs,
                className: `drop-down__select ${!!error && "drop-down__select--error"}`,
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                        value: "",
                        selected: true,
                        disabled: true,
                        hidden: true,
                        children: placeholder || "Select"
                    }),
                    options.map((e)=>{
                        return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("option", {
                            value: e.value,
                            children: [
                                " ",
                                e.name,
                                " "
                            ]
                        }));
                    })
                ]
            }),
            error && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "drop-down__error-label",
                children: error.message
            })
        ]
    }));
};


/***/ })

};
;