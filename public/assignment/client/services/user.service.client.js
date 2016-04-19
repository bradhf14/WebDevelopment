//useful in various parts of application, hence why we create this

(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http) {

        var model = {

            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };

        //Eliminate all callback in refactoring process
        return model;

        function findUserByCredentials(username, password){
            return $http.get ("/api/assignment/user?username=" + username + "&password=" + password);
        }

        function findUserByUsername(username){
            return $http.get ("/api/assignment/user?username=" + username);
        }

        function findAllUsers(){
            return $http.get ("/api/assignment/user");
        }

        function createUser(user){
            return $http.post("/api/assignment/user", user);
        }

        function deleteUserById(userId){
            return $http.delete ("/api/assignment/user/" + userId);
        }

        function updateUser (userId, user) {
            return $http.put ("/api/assignment/user/" + userId, user);
        }
    }
})();