tsb.factory("TestSpecificationService", function($http){
	var child = {
		getResource : function() {
			return 'testSpecification';
		},

		getHttp : function() {
			return $http;
		},
		
		getBaseUrl : function() {
			return baseUrl;
		},
		
		// override
		findById : function(id,excludeXml){
	        var url = this.getBaseUrl() + this.getResource() + '/' + id + '?_=' + Math.random();
	        if (excludeXml) {
	            url = url + "&excludeXml=true";
	        }
	        return  this.getHttp().get(url).then(this.successHandler, this.errorHandler);
	    },
	    
	    retireTestSpecification: function(testSpecificationId,undoRetirement) {
	        var url = this.getBaseUrl() + this.getResource() + '/' + testSpecificationId + '/retire';
	        if (undoRetirement) {
	            url = url + '?undoRetirement=' + undoRetirement;
	        }
	        
            return this.getHttp()({ 
                method: "PUT",
                url: url,
                data: {} 
            }).then(this.successHandler, this.errorHandler);
        },
		
		requestExportPackage: function(testSpecificationId) {
            return this.getHttp()({ 
                method: "POST",
                url: this.getBaseUrl() + this.getResource() + '/' + testSpecificationId + '/exportPackage',
                data: {} 
            }).then(this.successHandler, this.errorHandler);
        },
        
        retryExportPackage: function(testSpecificationId) {
            return this.getHttp()({ 
                method: "PUT",
                url: this.getBaseUrl() + this.getResource() + '/' + testSpecificationId + '/retryExportPackage',
                data: {} 
            }).then(this.successHandler, this.errorHandler);
        },
        
        updateTenantSet: function(testSpecificationId, tenantSet) {
            return this.getHttp()({ 
                method: "PUT",
                url: this.getBaseUrl() + this.getResource() + '/' + testSpecificationId + '/updateTenantSet',
                data: tenantSet
            }).then(this.successHandler, this.errorHandler);
        },
        
        isAdminUser : function() {
            return this.getHttp().get(baseUrl + this.getResource() + '/isAdminUser?_=' + Math.random()).then(this.successHandler, this.errorHandler);
        },
		
        getSpecificationPurposes : function(){
            return this.getHttp().get(baseUrl + this.getResource() + '/purpose?_=' + Math.random()).then(this.successHandler, this.errorHandler);
        },
        
        getExportStatuses : function(){
            return this.getHttp().get(baseUrl + this.getResource() + '/exportStatus?_=' + Math.random()).then(this.successHandler, this.errorHandler);
        }

    };
	var service = angular.extend({}, BaseService);
	return angular.extend(service, child);
});