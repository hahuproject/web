"use strict";
exports.id = 334;
exports.ids = [334];
exports.modules = {

/***/ 860:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Q": () => (/* binding */ ClassFromJSON),
/* harmony export */   "u": () => (/* binding */ ClassToJSON)
/* harmony export */ });
/* harmony import */ var _Course__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(275);
/* harmony import */ var _Department__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(374);
/* harmony import */ var _Section__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(125);
/* harmony import */ var _Stream__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(963);
/* harmony import */ var _User__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(797);





const ClassFromJSON = (_class)=>{
    return {
        ID: _class["classId"],
        Name: _class["name"],
        SubName: _class["subName"] ?? "",
        Department: !!_class["department"] && (0,_Department__WEBPACK_IMPORTED_MODULE_1__/* .DepartmentFromJSON */ .H)(_class["department"]),
        Stream: !!_class["stream"] && (0,_Stream__WEBPACK_IMPORTED_MODULE_3__/* .StreamFromJSON */ .k)(_class["stream"]),
        Students: !!_class["students"] ? _class["students"].map((e)=>(0,_User__WEBPACK_IMPORTED_MODULE_4__/* .StudentFromJSON */ .xA)(e)
        ) : [],
        Sections: !!_class["sections"] ? _class["sections"].map((e)=>(0,_Section__WEBPACK_IMPORTED_MODULE_2__/* .SectionFromJSON */ .h)(e)
        ) : [],
        Courses: !!_class["courses"] ? _class["courses"].map((e)=>(0,_Course__WEBPACK_IMPORTED_MODULE_0__/* .CourseFromJSON */ .J)(e)
        ) : []
    };
};
const ClassToJSON = (_class)=>{
    return {
        classId: _class.ID,
        name: _class.Name,
        subName: _class.SubName ?? "",
        department: (0,_Department__WEBPACK_IMPORTED_MODULE_1__/* .DepartmentToJSON */ .m)(_class.Department),
        stream: !!_class.Stream ? (0,_Stream__WEBPACK_IMPORTED_MODULE_3__/* .StreamToJSON */ .L)(_class.Stream) : {
        },
        students: [],
        sections: !!_class.Sections ? _class.Sections.map((e)=>(0,_Section__WEBPACK_IMPORTED_MODULE_2__/* .SectionToJSON */ .S)(e)
        ) : [],
        courses: !!_class.Courses ? _class.Courses.map((e)=>(0,_Course__WEBPACK_IMPORTED_MODULE_0__/* .CourseToJSON */ .Q)(e)
        ) : []
    };
};


/***/ }),

/***/ 275:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "J": () => (/* binding */ CourseFromJSON),
/* harmony export */   "Q": () => (/* binding */ CourseToJSON)
/* harmony export */ });
/* harmony import */ var _User__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(797);

const CourseFromJSON = (course)=>{
    return {
        ID: course["courseId"],
        Name: course["name"],
        CreditHr: parseInt(course["creditHr"]) ?? 0,
        Color: course["color"] ?? "#fff",
        Users: !!course["users"] ? course["users"].map((e)=>(0,_User__WEBPACK_IMPORTED_MODULE_0__/* .UserFromJSON */ .c7)(e)
        ) : [],
        Prerequisites: !!course["prerequisites"] ? course["prerequisites"].map((e)=>CourseFromJSON(e)
        ) : []
    };
};
const CourseToJSON = (course)=>{
    return {
        courseId: course.ID ?? "",
        name: course.Name,
        creditHr: parseInt(course.CreditHr.toString()),
        color: course.Color,
        users: !!course.Users ? course.Users.map((e)=>(0,_User__WEBPACK_IMPORTED_MODULE_0__/* .UserToJSON */ .oE)(e)
        ) : [],
        prerequisites: !!course.Prerequisites ? course.Prerequisites.map((e)=>CourseToJSON(e)
        ) : []
    };
};


/***/ }),

/***/ 374:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "H": () => (/* binding */ DepartmentFromJSON),
/* harmony export */   "m": () => (/* binding */ DepartmentToJSON)
/* harmony export */ });
/* harmony import */ var _Class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(860);
/* harmony import */ var _Stream__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(963);
/* harmony import */ var _User__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(797);



const DepartmentFromJSON = (department)=>{
    const _department = {
        ID: department["departmentId"],
        Name: department["name"],
        Head: !!department["head"] && !!department["head"]["user"] && (0,_User__WEBPACK_IMPORTED_MODULE_2__/* .UserFromJSON */ .c7)(department["head"]["user"]),
        Classes: !!department["classes"] ? department["classes"].map((e)=>(0,_Class__WEBPACK_IMPORTED_MODULE_0__/* .ClassFromJSON */ .Q)(e)
        ) : [],
        Streams: !!department["streams"] ? department["streams"].map((e)=>(0,_Stream__WEBPACK_IMPORTED_MODULE_1__/* .StreamFromJSON */ .k)(e)
        ) : []
    };
    return _department;
};
const DepartmentToJSON = (department)=>{
    // console.log(!!department.Head);
    return {
        departmentId: department.ID,
        name: department.Name,
        head: !!department.Head ? {
            userId: department.Head.ID,
            user: (0,_User__WEBPACK_IMPORTED_MODULE_2__/* .UserToJSON */ .oE)(department.Head)
        } : {
        },
        classes: !!department.Classes ? department.Classes.map((e)=>(0,_Class__WEBPACK_IMPORTED_MODULE_0__/* .ClassToJSON */ .u)(e)
        ) : [],
        streams: !!department.Streams ? department.Streams.map((e)=>(0,_Stream__WEBPACK_IMPORTED_MODULE_1__/* .StreamToJSON */ .L)(e)
        ) : []
    };
};


/***/ }),

/***/ 125:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "h": () => (/* binding */ SectionFromJSON),
/* harmony export */   "S": () => (/* binding */ SectionToJSON)
/* harmony export */ });
/* harmony import */ var _Class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(860);
/* harmony import */ var _Session__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(500);
/* harmony import */ var _User__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(797);



const SectionFromJSON = (section)=>{
    return {
        ID: section["sectionId"] ?? "",
        Name: section["name"] ?? "",
        Year: section["year"] ?? 0,
        Class: !!section["class"] ? (0,_Class__WEBPACK_IMPORTED_MODULE_0__/* .ClassFromJSON */ .Q)(section["class"]) : null,
        Sessions: !!section["sessions"] ? section["sessions"].map((e)=>(0,_Session__WEBPACK_IMPORTED_MODULE_1__/* .SessionFromJSON */ .b)(e)
        ) : null,
        Students: !!section["students"] ? section["students"].map((e)=>(0,_User__WEBPACK_IMPORTED_MODULE_2__/* .StudentFromJSON */ .xA)(e)
        ) : null
    };
};
const SectionToJSON = (section)=>{
    return {
        sectionId: section.ID,
        name: section.Name,
        year: section.Year,
        class: (0,_Class__WEBPACK_IMPORTED_MODULE_0__/* .ClassToJSON */ .u)(section.Class),
        sessions: section.Sessions ? section.Sessions.map((e)=>(0,_Session__WEBPACK_IMPORTED_MODULE_1__/* .SessionToJSON */ .K)(e)
        ) : []
    };
};


/***/ }),

/***/ 500:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "b": () => (/* binding */ SessionFromJSON),
/* harmony export */   "K": () => (/* binding */ SessionToJSON)
/* harmony export */ });
/* harmony import */ var _Course__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(275);
/* harmony import */ var _Section__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(125);
/* harmony import */ var _User__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(797);



const SessionFromJSON = (session)=>{
    return {
        ID: session["sessionId"] ?? "",
        StartDate: !!session["startDate"] ? new Date(session["startDate"]) : null,
        Duration: session["duration"] ?? 0,
        Section: session["section"] ? (0,_Section__WEBPACK_IMPORTED_MODULE_1__/* .SectionFromJSON */ .h)(session["section"]) : null,
        Course: !!session["course"] ? (0,_Course__WEBPACK_IMPORTED_MODULE_0__/* .CourseFromJSON */ .J)(session["course"]) : null,
        User: !!session["instructor"] ? (0,_User__WEBPACK_IMPORTED_MODULE_2__/* .UserFromJSON */ .c7)(session["instructor"]) : null
    };
};
const SessionToJSON = (session)=>{
    return {
        sessionId: session.ID,
        startDate: session.StartDate,
        duration: session.Duration,
        section: (0,_Section__WEBPACK_IMPORTED_MODULE_1__/* .SectionToJSON */ .S)(session.Section),
        course: !!session.Course ? (0,_Course__WEBPACK_IMPORTED_MODULE_0__/* .CourseToJSON */ .Q)(session.Course) : {
        },
        instructor: !!session.User ? (0,_User__WEBPACK_IMPORTED_MODULE_2__/* .UserToJSON */ .oE)(session.User) : {
        }
    };
};


/***/ }),

/***/ 963:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "k": () => (/* binding */ StreamFromJSON),
/* harmony export */   "L": () => (/* binding */ StreamToJSON)
/* harmony export */ });
/* harmony import */ var _Department__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(374);

const StreamFromJSON = (_class)=>{
    return {
        ID: _class["streamId"],
        Name: _class["name"],
        Department: !!_class["department"] && (0,_Department__WEBPACK_IMPORTED_MODULE_0__/* .DepartmentFromJSON */ .H)(_class["department"])
    };
};
const StreamToJSON = (_class)=>{
    return {
        streamId: _class.ID,
        name: _class.Name,
        department: (0,_Department__WEBPACK_IMPORTED_MODULE_0__/* .DepartmentToJSON */ .m)(_class.Department)
    };
};


/***/ }),

/***/ 797:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "xA": () => (/* binding */ StudentFromJSON),
  "Wg": () => (/* binding */ USER_TYPES1),
  "c7": () => (/* binding */ UserFromJSON),
  "oE": () => (/* binding */ UserToJSON)
});

// UNUSED EXPORTS: EmploymentType

;// CONCATENATED MODULE: ./lib/models/Address.ts
const AddressFromJSON = (address)=>{
    return {
        ID: address["addressId"],
        Country: address["country"],
        Region: address["region"],
        City: address["city"],
        SubCity: address["subCity"],
        Woreda: address["woreda"],
        HouseNo: address["houseNo"]
    };
};
const AddressToJSON = (address)=>{
    return {
        addressId: (address && address.ID) ?? "",
        country: (address && address.Country) ?? "",
        region: (address && address.Region) ?? "",
        city: (address && address.City) ?? "",
        subCity: (address && address.SubCity) ?? "",
        woreda: (address && address.Woreda) ?? 0,
        houseNo: (address && address.HouseNo.toString()) ?? ""
    };
};

// EXTERNAL MODULE: ./lib/models/Class.ts
var Class = __webpack_require__(860);
// EXTERNAL MODULE: ./lib/models/Course.ts
var Course = __webpack_require__(275);
// EXTERNAL MODULE: ./lib/models/Department.ts
var Department = __webpack_require__(374);
// EXTERNAL MODULE: ./lib/models/Section.ts
var Section = __webpack_require__(125);
// EXTERNAL MODULE: ./lib/models/Stream.ts
var Stream = __webpack_require__(963);
;// CONCATENATED MODULE: ./lib/models/User.ts






var USER_TYPES1;

(function(USER_TYPES) {
    USER_TYPES["SUPER_ADMIN"] = "super-admin";
    USER_TYPES["ADMIN"] = "admin";
    USER_TYPES["REGISTRY_OFFICER"] = "registry-officer";
    USER_TYPES["SUB_REGISTRY_OFFICER"] = "sub-registry-officer";
    USER_TYPES["DEPARTMENT_HEAD"] = "department-head";
    USER_TYPES["INSTRUCTOR"] = "instructor";
    USER_TYPES["SUPERVISOR"] = "supervisor";
    USER_TYPES["STUDENT"] = "student";
})(USER_TYPES1 || (USER_TYPES1 = {
}));
var EmploymentType1;

(function(EmploymentType) {
    EmploymentType["FullTime"] = "FULL-TIME";
    EmploymentType["PartTime"] = "PART-TIME";
})(EmploymentType1 || (EmploymentType1 = {
}));
const UserFromJSON = (user)=>{
    var _user = {
        ID: user["userId"],
        FirstName: user["firstName"],
        LastName: user["lastName"],
        Email: user["email"] ?? "",
        Phone: user["phone"] ?? "",
        Username: user["username"],
        Password: user["password"],
        Address: {
            Country: user["address"]["country"],
            Region: user["address"]["region"] ?? "",
            City: user["address"]["city"] ?? "",
            SubCity: user["address"]["subCity"] ?? "",
            Woreda: user["address"]["woreda"] ?? 0,
            HouseNo: user["address"]["houseNo"] ?? ""
        },
        ProfilePic: user["profilePic"],
        Type: !!user["type"] ? user["type"].split("_").join("-").toString().toLowerCase() : "",
        Verified: !!user["verified"],
        Banned: !!user["banned"],
        CreatedAt: new Date(user["createdAt"]),
        SalaryRate: user["salaryRate"] ?? 0,
        EmploymentType: user["employmentType"],
        Industry: user["industry"] ?? "",
        //Student
        MiddleName: user["middleName"],
        Gender: user["gender"],
        BirthDate: user["birthDate"],
        BirthPlace: user["birthPlace"],
        Disability: user["disability"],
        PreviousSchool: user["previousSchool"],
        AvarageMarkForHighSchool: user["avarageMarkForHighSchool"],
        MatricResult: user["matricResult"],
        Program: user["program"],
        EmergencyContactName: user["emergencyContactName"],
        EmergencyContactPhone: user["emergencyContactPhone"],
        EmergencyContactRelation: user["emergencyContactRelation"],
        EmergencyContactAddress: user["emergencyContactAddress"],
        Stream: !!user["stream"] ? (0,Stream/* StreamFromJSON */.k)(user["stream"]) : null,
        Department: !!user["department"] ? (0,Department/* DepartmentFromJSON */.H)(user["department"]) : null,
        Section: !!user["section"] ? (0,Section/* SectionFromJSON */.h)(user["section"]) : null
    };
    return _user;
};
const UserToJSON = (user)=>{
    return {
        userId: user.ID,
        firstName: user.FirstName,
        lastName: user.LastName,
        email: user.Email,
        phone: user.Phone,
        username: user.Username,
        profilePic: user.ProfilePic.toString(),
        type: user.Type,
        password: user.Password,
        address: AddressToJSON(user.Address),
        verified: !!user.Verified,
        createdAt: user.CreatedAt,
        salaryRate: user.SalaryRate,
        employmentType: user.EmploymentType,
        industry: user.Industry ?? "",
        //Student
        middleName: user.MiddleName,
        gender: user.Gender,
        birthDate: user.BirthDate,
        birthPlace: user.BirthPlace,
        disability: user.Disability,
        previousSchool: user.PreviousSchool,
        avarageMarkForHighSchool: user.AvarageMarkForHighSchool,
        matricResult: user.MatricResult,
        program: user.Program,
        emergencyContactName: user.EmergencyContactName,
        emergencyContactPhone: user.EmergencyContactPhone,
        emergencyContactRelation: user.EmergencyContactRelation,
        emergencyContactAddress: AddressToJSON(user.EmergencyContactAddress),
        stream: user.Stream,
        department: user.Department,
        section: user.Section
    };
};
const StudentFromJSON = (student)=>{
    return {
        ID: student["userId"],
        MiddleName: student["middleName"],
        Gender: student["gender"],
        BirthDate: student["birthDate"],
        BirthPlace: student["birthPlace"],
        Disability: student["disability"],
        PreviousSchool: student["previousSchool"],
        AvarageMarkForHighSchool: student["averageMarkForHighschool"],
        MatricResult: student["matricResult"],
        Program: student["program"],
        Department: !!student["department"] && (0,Department/* DepartmentFromJSON */.H)(student["department"]),
        Section: student["section"],
        Courses: !!student["courses"] && student["courses"].map((e)=>(0,Course/* CourseFromJSON */.J)(e)
        ),
        EmergencyContactName: student["emergencyContactName"],
        EmergencyContactPhone: student["emergencyContactPhone"],
        EmergencyContactRelation: student["emergencyContactRelation"],
        EmergencyContactAddress: !!student["emergencyContactAddress"] && AddressFromJSON(student["emergencyContactAddress"]),
        User: !!student["user"] && UserFromJSON(student["user"]),
        Paid: !!student["paid"] ? student["paid"] : false
    };
};


/***/ }),

/***/ 334:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Xt": () => (/* binding */ AuthLoading1),
/* harmony export */   "Ho": () => (/* binding */ AuthProvider),
/* harmony export */   "aC": () => (/* binding */ useAuth)
/* harmony export */ });
/* unused harmony export AuthError */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _models_User__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(797);
/* harmony import */ var _utils_axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(645);

/*

SERVICES
  - Register
  - Login
  - LogOut

STATES
  - Error ( Enum -> registration, login, logout )
  - Loading ( Enum -> Registering, logging in, logging out )

*/ 


var //URLS
AUTH_URL1;
(function(AUTH_URL) {
    AUTH_URL["DEV"] = "/auth";
})(AUTH_URL1 || (AUTH_URL1 = {
}));
var AuthLoading1;

(function(AuthLoading) {
    AuthLoading["AUTO_LOGIN"] = "auto login";
    AuthLoading["LOGIN"] = "login";
    AuthLoading["REGISTER"] = "register";
    AuthLoading["FETCHING_USERS"] = "fetching users";
    AuthLoading["FETCHING_STUDENTS"] = "fetching students";
    AuthLoading["APPROVING_USER"] = "approving user";
    AuthLoading["BANNING_USER"] = "banning / unbanning user";
    AuthLoading["UPDATING_STUDENT_PAYMENT"] = "updating student payment";
})(AuthLoading1 || (AuthLoading1 = {
}));
var AuthError1;

(function(AuthError) {
    AuthError["ERR_NETWORK"] = "network error";
    AuthError["ERR_INVALID_CREDENTIALS"] = "Invalid credentials";
    AuthError["ERR_FAILED_TO_FETCH_USERS"] = "failed to fetch users";
    AuthError["ERR_FAILED_TO_FETCH_STUDENTS"] = "failed to fetch students";
    AuthError["ERR_FAILED_TO_APPROVE_USER"] = "failed to approve user";
    AuthError["ERR_FAILED_TO_BAN_USER"] = "failed to ban/unban user";
    AuthError["ERR_UPDATING_STUDENT_PAYMENT"] = "failed to update student payment";
})(AuthError1 || (AuthError1 = {
}));
const AUTH_CONTEXT = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({
    user: null,
    users: null,
    students: null,
    loading: null,
    error: null,
    setError: (v)=>{
    },
    Login: (username, password, save, successCallback, failCallback)=>{
    },
    Register: (user, successCallback, failCallback)=>{
    },
    GetUsers: ()=>{
    },
    GetStudents: ()=>{
    },
    UpdateStudentPayment: (userId, status, successCallback, failCallback)=>{
    },
    ApproveUser: (user, successCallback, failCallback)=>{
    },
    Logout: (successCallback, failCallback)=>{
    },
    BanUser: (user, successCallback, failCallback)=>{
    },
    UnbanUser: (user, successCallback, failCallback)=>{
    }
});
const AuthProvider = ({ children  })=>{
    const { 0: user1 , 1: setUser  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
    const { 0: users , 1: setUsers  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
    const { 0: students , 1: setStudents  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
    const { 0: loading , 1: setLoading  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(AuthLoading1.AUTO_LOGIN);
    const { 0: error1 , 1: setError  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        _autologin();
    }, []);
    const _getMe = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        try {
            const _res = await _utils_axios__WEBPACK_IMPORTED_MODULE_3__/* .axios.get */ .o.get(`${AUTH_URL1.DEV}/me`);
            const _user = (0,_models_User__WEBPACK_IMPORTED_MODULE_2__/* .UserFromJSON */ .c7)(_res.data);
            if (_user) {
                return _user;
            } else {
                return null;
            }
        } catch (error) {
            return null;
        }
    }, []);
    const _autologin = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        try {
            setError(null);
            setLoading(AuthLoading1.AUTO_LOGIN);
            const _authToken = localStorage.getItem("authToken");
            if (!!!_authToken) {
                setLoading(null);
                return;
            }
            _utils_axios__WEBPACK_IMPORTED_MODULE_3__/* .axios.defaults.headers.common.Authorization */ .o.defaults.headers.common.Authorization = `Bearer ${_authToken}`;
            const _user = await _getMe();
            console.log("auto login", _user);
            setUser(_user);
            setLoading(null);
        } catch (error) {
            console.log(error.toJSON());
            console.log(error);
            setLoading(null);
        }
    }, []);
    const Login = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (username, password, save, successCallback = ()=>{
    }, failCallback = ()=>{
    })=>{
        try {
            setError(null);
            setLoading(AuthLoading1.LOGIN);
            const _res = await _utils_axios__WEBPACK_IMPORTED_MODULE_3__/* .axios.post */ .o.post(AUTH_URL1.DEV + "/login", {
                username,
                password
            });
            console.log(_res);
            const _loginRes = _res.data;
            _utils_axios__WEBPACK_IMPORTED_MODULE_3__/* .axios.defaults.headers.common.Authorization */ .o.defaults.headers.common.Authorization = `Bearer ${_loginRes.token}`;
            const _user = await _getMe();
            if (_user == null) {
                throw {
                    message: "Can not get user"
                };
            }
            if (_user.Type != _models_User__WEBPACK_IMPORTED_MODULE_2__/* .USER_TYPES.SUPER_ADMIN */ .Wg.SUPER_ADMIN && _user.Type != _models_User__WEBPACK_IMPORTED_MODULE_2__/* .USER_TYPES.ADMIN */ .Wg.ADMIN && _user.Type != _models_User__WEBPACK_IMPORTED_MODULE_2__/* .USER_TYPES.REGISTRY_OFFICER */ .Wg.REGISTRY_OFFICER && _user.Type != _models_User__WEBPACK_IMPORTED_MODULE_2__/* .USER_TYPES.DEPARTMENT_HEAD */ .Wg.DEPARTMENT_HEAD) {
                throw {
                    message: "Can not access admin panel with your credentials"
                };
            }
            if (save) {
                localStorage.setItem("authToken", _loginRes.token);
            }
            setUser(_user);
            successCallback();
            setLoading(null);
        } catch (error) {
            console.log(error);
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                setError(error.response.data);
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
                setError(error.message);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
                setError(error.message);
            }
            failCallback();
            setLoading(null);
        }
    }, []);
    const Register = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (user, successCallback, failCallback)=>{
        try {
            setError(null);
            setLoading(AuthLoading1.REGISTER);
            const _registerFormData = new FormData();
            _registerFormData.append("firstName", user.FirstName);
            _registerFormData.append("lastName", user.LastName);
            _registerFormData.append("email", user.Email);
            _registerFormData.append("phone", user.Phone);
            _registerFormData.append("username", user.Username);
            _registerFormData.append("password", user.Password);
            _registerFormData.append("country", user.Address.Country);
            _registerFormData.append("region", user.Address.Region);
            _registerFormData.append("city", user.Address.City);
            _registerFormData.append("subCity", user.Address.SubCity);
            _registerFormData.append("woreda", user.Address.Woreda.toString());
            _registerFormData.append("houseNo", user.Address.HouseNo.toString());
            _registerFormData.append("profilePic", user.ProfilePic);
            //Student
            _registerFormData.append("middleName", user.MiddleName);
            _registerFormData.append("gender", user.Gender);
            _registerFormData.append("birthDate", user.BirthDate);
            _registerFormData.append("birthPlace", user.BirthPlace);
            _registerFormData.append("disability", user.Disability);
            _registerFormData.append("previousSchool", user.PreviousSchool);
            _registerFormData.append("avarageMarkForHighSchool", user.AvarageMarkForHighSchool && user.AvarageMarkForHighSchool.toString());
            _registerFormData.append("matricResult", user.MatricResult && user.MatricResult.toString());
            _registerFormData.append("program", user.Program);
            _registerFormData.append("classId", "");
            _registerFormData.append("streamId", !!user.Stream ? user.Stream.ID : "");
            _registerFormData.append("departmentName", user.Department && user.Department.Name);
            _registerFormData.append("departmentId", user.Department && user.Department.ID);
            _registerFormData.append("emergencyContactName", user.EmergencyContactName);
            _registerFormData.append("emergencyContactPhone", user.EmergencyContactPhone);
            _registerFormData.append("emergencyContactRelation", user.EmergencyContactRelation);
            _registerFormData.append("emergencyContactCountry", user.EmergencyContactAddress && user.EmergencyContactAddress.Country);
            _registerFormData.append("emergencyContactRegion", user.EmergencyContactAddress && user.EmergencyContactAddress.Region);
            _registerFormData.append("emergencyContactCity", user.EmergencyContactAddress && user.EmergencyContactAddress.City);
            _registerFormData.append("emergencyContactSubcity", user.EmergencyContactAddress && user.EmergencyContactAddress.SubCity);
            _registerFormData.append("emergencyContactWoreda", user.EmergencyContactAddress && user.EmergencyContactAddress.Woreda.toString());
            _registerFormData.append("emergencyContactHouseNo", user.EmergencyContactAddress && user.EmergencyContactAddress.HouseNo.toString());
            _registerFormData.append("employmentType", user.EmploymentType && user.EmploymentType);
            const _res = await _utils_axios__WEBPACK_IMPORTED_MODULE_3__/* .axios.post */ .o.post(`${AUTH_URL1.DEV}/register/${user.Type}`, _registerFormData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            console.log(_res);
            successCallback();
            setLoading(null);
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                setError(error.response.data);
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
                setError(error.message);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
                setError(error.message);
            }
            failCallback();
            setLoading(null);
        }
    }, []);
    const UpdateStudentPayment = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (userId, status, successCallback, failCallback)=>{
        var statusUrl = "";
        if (status.toString() == "true") {
            statusUrl = `&status=true`;
        }
        try {
            setError(null);
            setLoading(AuthLoading1.UPDATING_STUDENT_PAYMENT);
            console.log("status");
            console.log(status);
            console.log(statusUrl);
            const _res = await _utils_axios__WEBPACK_IMPORTED_MODULE_3__/* .axios.get */ .o.get(AUTH_URL1.DEV + `/students/update-payment?id=${userId}${statusUrl}`);
            setStudents((prev)=>[
                    (0,_models_User__WEBPACK_IMPORTED_MODULE_2__/* .StudentFromJSON */ .xA)(_res.data),
                    ...prev.filter((e)=>e.ID != userId
                    ), 
                ]
            );
            // GetStudents();
            setLoading(null);
            successCallback();
        } catch (error) {
            console.log(error);
            setError(AuthError1.ERR_UPDATING_STUDENT_PAYMENT);
            setLoading(null);
            failCallback();
        }
    }, []);
    const GetStudents = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        try {
            setError(null);
            setLoading(AuthLoading1.FETCHING_STUDENTS);
            const _res = await _utils_axios__WEBPACK_IMPORTED_MODULE_3__/* .axios.get */ .o.get(AUTH_URL1.DEV + "/students");
            setStudents(_res.data.map((e)=>(0,_models_User__WEBPACK_IMPORTED_MODULE_2__/* .StudentFromJSON */ .xA)(e)
            ));
            setLoading(null);
        } catch (error) {
            console.log(error);
            setError(AuthError1.ERR_FAILED_TO_FETCH_STUDENTS);
            setLoading(null);
        }
    }, []);
    const GetUsers = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        try {
            setError(null);
            setLoading(AuthLoading1.FETCHING_USERS);
            const _res = await _utils_axios__WEBPACK_IMPORTED_MODULE_3__/* .axios.get */ .o.get(AUTH_URL1.DEV + "/users");
            setUsers(_res.data.map((e)=>(0,_models_User__WEBPACK_IMPORTED_MODULE_2__/* .UserFromJSON */ .c7)(e)
            ));
            setLoading(null);
        } catch (error) {
            console.log(error);
            setError(AuthError1.ERR_FAILED_TO_FETCH_USERS);
            setLoading(null);
        }
    }, []);
    const UnbanUser = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (user, successCallback, failCallback)=>{
        try {
            setError(null);
            setLoading(AuthLoading1.BANNING_USER);
            const _res = await _utils_axios__WEBPACK_IMPORTED_MODULE_3__/* .axios.get */ .o.get(AUTH_URL1.DEV + `/unban?id=${user.ID}`);
            setUsers((prev)=>[
                    ...prev.map((e)=>{
                        if (e.ID == user.ID) {
                            e.Banned = false;
                            return e;
                        }
                        return e;
                    }), 
                ]
            );
            setLoading(null);
            successCallback && successCallback();
        } catch (error) {
            console.log(error);
            setError(AuthError1.ERR_FAILED_TO_BAN_USER);
            setLoading(null);
            failCallback && failCallback();
        }
    }, []);
    const BanUser = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (user, successCallback, failCallback)=>{
        try {
            setError(null);
            setLoading(AuthLoading1.BANNING_USER);
            const _res = await _utils_axios__WEBPACK_IMPORTED_MODULE_3__/* .axios.get */ .o.get(AUTH_URL1.DEV + `/ban?id=${user.ID}`);
            setUsers((prev)=>[
                    ...prev.map((e)=>{
                        if (e.ID == user.ID) {
                            e.Banned = true;
                            return e;
                        }
                        return e;
                    }), 
                ]
            );
            setLoading(null);
            successCallback && successCallback();
        } catch (error) {
            console.log(error);
            setError(AuthError1.ERR_FAILED_TO_BAN_USER);
            setLoading(null);
            failCallback && failCallback();
        }
    }, []);
    const ApproveUser = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (user, successCallback, failCallback)=>{
        try {
            setError(null);
            setLoading(AuthLoading1.APPROVING_USER);
            const _res = await _utils_axios__WEBPACK_IMPORTED_MODULE_3__/* .axios.get */ .o.get(AUTH_URL1.DEV + `/approve?id=${user.ID}`);
            // setUsers((prev) => [
            //   ...prev.map((e) => {
            //     if (e.ID == user.ID) {
            //       e.Verified = true;
            //       return e;
            //     }
            //     return e;
            //   }),
            // ]);
            GetUsers();
            setLoading(null);
            successCallback && successCallback();
        } catch (error) {
            console.log(error);
            setError(AuthError1.ERR_FAILED_TO_APPROVE_USER);
            setLoading(null);
            failCallback && failCallback();
        }
    }, []);
    const Logout = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((successCallback, failCallback)=>{
        try {
            localStorage.clear();
            successCallback && successCallback();
        } catch (error) {
            failCallback && failCallback();
        }
    }, []);
    const _contextValue = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>({
            user: user1,
            users,
            students,
            loading,
            error: error1,
            setError,
            Login,
            Register,
            GetUsers,
            ApproveUser,
            Logout,
            BanUser,
            UnbanUser,
            GetStudents,
            UpdateStudentPayment
        })
    , [
        user1,
        users,
        loading,
        error1,
        students
    ]);
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(AUTH_CONTEXT.Provider, {
        value: _contextValue,
        children: children
    }));
};
const useAuth = ()=>(0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(AUTH_CONTEXT)
;


/***/ }),

/***/ 645:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "o": () => (/* binding */ axios)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(167);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);

var URLS1;
(function(URLS) {
    URLS["DEV"] = "http://localhost:5000";
    URLS["PROD"] = "https://hahu-sms.herokuapp.com";
    URLS["LOCAL"] = "https://api.hahu.me";
    URLS["VPS"] = "http://18.134.74.142:5003";
})(URLS1 || (URLS1 = {
}));
const axios = axios__WEBPACK_IMPORTED_MODULE_0___default().create({
    baseURL: URLS1.LOCAL,
    headers: {
        // "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
    }
});


/***/ })

};
;