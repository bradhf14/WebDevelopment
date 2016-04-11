(function(){
    "use strict";
    angular
        .module("HousewivesApp")
        .controller("HousewifeForumController", HousewifeForumController);

    function HousewifeForumController(ForumService, UserService, $rootScope, $location) {

        console.log("hello from housewife forum controller");

        console.log($rootScope.currentUser.roles)
        var hwf = this;
        hwf.post  =   post;
        hwf.posts = ForumService.getAllPosts();
        hwf.cities = UserService.findAllCities();

        function post(newPost){

            console.log("this is the post you are trying to post");
            console.log(newPost);
            ForumService.createPost(newPost, $rootScope.currentUser);

        }
    }
})();