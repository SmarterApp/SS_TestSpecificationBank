tsb.factory("UserService", function($http){
	var service =   {
		getResource : function() {
			return 'user';
		},

    	getHttp : function() {
			return $http;
		},
		
		getBaseUrl : function() {
			return baseUrl;
		},
		
		getAssets : function(tenantId){
			var url = this.getBaseUrl() + this.getResource() + '/assets';
		    return this.getHttp().get(url,  {params:{'tenantId': tenantId, '_': Math.random()}}).then(this.successHandler, this.errorHandler);
    	},

    	getApplicableTenants : function(){
			var url = this.getBaseUrl() + this.getResource() + '/applicableTenants?_=' + Math.random();
		    return this.getHttp().get(url,  {params:{}}).then(this.successHandler, this.errorHandler);
    	},

	    save : function(object){
			// override with empty function
		},

		create : function(object) {
			// override with empty function
		},

	    remove : function(object){
	    	// override with empty function
		},

	    update : function(object){
			// override with empty function
		},

		search : function(object) {
			// override with empty function
		},

	    findById : function(object){
	    	// override with empty function
		},
		
    	getCurrentUser : function(){
			var url = this.getBaseUrl() + this.getResource() + '/currentUser';
		    return this.getHttp().get(url).then(this.successHandler, this.errorHandler);
    	}
    };
	
	var userService = angular.extend({}, BaseService);
	return angular.extend(userService, service);
});
