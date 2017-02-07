'use strict';

var Promise = require('promise');
var _ = require('lodash');

module.exports = function (connection) {
    var Mysql = {

        createDatabase: function createDatabase(name) {
            return new Promise(function (resolve, reject) {
                connection.query('CREATE DATABASE IF NOT EXISTS ' + name + ';', function (err, rows, fields) {
                    if (err) {
                        return reject(err);
                    }

                    resolve(rows);
                });
            });
        },

        createUser: function createUser(user, password) {
            return new Promise(function (resolve, reject) {
                connection.query('CREATE USER "' + user + '"@"localhost" IDENTIFIED BY "' + password + '"', function (err, rows, fields) {
                    if (err) {
                        return reject(err);
                    }

                    resolve(rows);
                });
            });
        },

        createDatabaseUser: function createDatabaseUser(database, user, password) {
            return new Promise(function (resolve, reject) {
                connection.query('GRANT ALL ON `' + database + '`.* TO "' + user + '"@"localhost" IDENTIFIED BY "' + password + '"', function (err, rows, fields) {
                    if (err) {
                        return reject(err);
                    }

                    resolve(rows);
                });
            });
        },

        grantPrivileges: function grantPrivileges(user, database) {
            return new Promise(function (resolve, reject) {
                if (typeof database !== 'undefined' && database && database.length) {
                    database += '.*';
                } else {
                    database = '*.*';
                }
                connection.query('GRANT ALL PRIVILEGES ON ' + database + ' TO "' + user + '"@"localhost" WITH GRANT OPTION', function (err, rows, fields) {
                    if (err) {
                        return reject(err);
                    }

                    resolve(rows);
                });
            });
        }

    };

    return Mysql;
};