<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page session="false"%>

<!doctype html>
<html data-ng-app="tsb" id="ng-app">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=Edge">
        <title>Test Spec Bank - Dashboard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="">
        <meta name="author" content="">
        <jsp:include page="${includePath}/css-includes.jsp"></jsp:include>
        <script src="${baseUrl}resources/js/nothing.js"></script>
    </head>

    <body>
        <input type="hidden" id="baseUrl" value="${baseUrl}" />
        <input type="hidden" id="tsbComponentName" value="${tsbComponentName}" />
        <div id="top" class="container" data-ng-controller="UserController">
            <div class="header" >
                <div class="info">
                    <ul>
                        <li>Logged in as: 
                            ${user}
                        </li>
                        <li>View Specs For: 
                            <select data-ng-model="selectedTenant" data-ng-change="changeTenant()" data-ng-options="tenant.type + ' - ' + tenant.name for tenant in tenantContainer">
                               
                            </select>
                        </li>
                        <li><a href="saml/logout">Logout</a></li>
                    </ul>
                </div>
                <div class="banner" data-ng-controller="HomeController">                           
	                <span class="logo"><a href="#" data-ng-click="go('/home')"><img data-ng-src="{{logoImage}}" class="thumbnail" alt="Logo" name="SBAC_logo"></a></span>
	                <span class="homeBtn dropdown">
	                    <button class="boxBtn" onClick="javascript:location.href='/'">
	                        <span class="btnIcon icon_sprite icon_home2"></span>
	                        <span class="btnText">Home</span>
	                    </button>
	                 </span>                             
	                <div class="title"><h1>Test Spec Bank Dashboard</h1></div>
	                <div class="clear"></div>
                </div>
            </div>
        </div>

        <div class="content" data-ng-controller="HomeController">
                <div data-ui-view="tsbview"></div>
        </div>

        <jsp:include page="${includePath}/js-includes.jsp"></jsp:include>
               
    </body>

</html>
