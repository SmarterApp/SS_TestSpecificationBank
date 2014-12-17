tsb.factory("VersionService", function($http){
	var service = {
		getResource : function() {
			return 'version';
		},

		getHttp : function() {
			return $http;
		},
		
		getBaseUrl : function() {
			return baseUrl;
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
		
		getBuildInfo : function(){
	        var url = this.getBaseUrl() + this.getResource() + '?_=' + Math.random();
	        return  this.getHttp().get(url).then(this.successHandler, this.errorHandler);
	    }
    };
	return angular.extend(service, BaseService);
});
