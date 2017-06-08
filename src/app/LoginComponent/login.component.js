"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var login_service_1 = require("../../services/login.service");
var router_1 = require("@angular/router");
// <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
//         <div class="form-group">
//             <label for="email">Email</label>
//             <input type="email" class="form-control" id="email" name ="email" required [(ngModel)]="email" #emailState="ngModel">
//         </div>
//         <div class="form-group">
//             <label for="password">Password</label>
//             <input type="password" class="form-control" id="password" name="password" required [(ngModel)]="password" #password="ngModel">
//         </div>
//         <button type="submit" class="btn btn-default" >Login</button>
//     </form>
var LoginComponent = (function () {
    function LoginComponent(loginService, router) {
        this.loginService = loginService;
        this.router = router;
        this.successMsg = true;
        this.errorMsg = true;
        this.submitting = false;
    }
    LoginComponent.prototype.onSubmit = function () {
        this.loginService.login(this.email, this.password);
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        // moduleId: module.id,   
        providers: [login_service_1.LoginService],
        template: "\n<div class=\"login-form-container\">\n    <h1>Login Form</h1>\n    \n\n</div>\n\n  ",
        styles: [
            "\n\n.login-form-container .ng-touched.ng-pristine.ng-invalid[required],\n.login-form-container .ng-touched.ng-dirty.ng-invalid[required] {\n    border-left: 5px solid #a94442;\n}\n\n.login-form-container .ng-touched.ng-dirty.ng-valid[required] {\n    border-left: 5px solid #42A948;\n}\n\n.login-form-container .alert {\n    text-transform: capitalize;\n}\n  "
        ]
    }),
    __metadata("design:paramtypes", [login_service_1.LoginService, router_1.Router])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map