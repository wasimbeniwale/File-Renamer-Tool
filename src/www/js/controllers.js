angular.module('App.controllers', [])

	.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

	})

	.controller('HomeCtrl', function ($scope, loadingIndicator, validation) {

		var dialog = require('electron').remote.dialog;
		var fs = require('fs');
		var options = {
			title: "Select Directory",
			properties: ['openFile', 'multiSelections']
		};

		$scope.fileList = [];

		$scope.getDirectory = function(){
			dialog.showOpenDialog(options, function (fileNames) {
				if (fileNames === undefined) return;

				// var fileName = fileNames[0];
				loadingIndicator.show();
				console.log(fileNames);
				var files = [];
				angular.forEach(fileNames, function(rec, index){
					files.push({
						parentPath: rec,
						oldName: rec.replace(/^.*[\\\/]/, ''),
						newName: ''
					});
				});

				$scope.fileList = [];

				angular.forEach(files, function(rec, index){
					var fileExt = rec.oldName.substring(rec.oldName.lastIndexOf('.'), rec.oldName.length);
					var parentPath = rec.parentPath.replace(rec.oldName, '');
					$scope.fileList.push({
						oldName: rec.oldName,
						newName: rec.newName,
						parentPath: parentPath,
						fileExt: fileExt
					});
				});

				console.log($scope.fileList);

				// $scope.fileList = files;

				loadingIndicator.hide();

				// fs.readFile(fileName, 'utf-8', function (err, data) {

				// 	document.getElementById("editor").value = data;

				// });
			}); 

			$scope.updateFileNames = function(){
				var newFileData = [];
				angular.forEach($scope.fileList, function(rec, index){
					if(validation.isValidValue(rec.newName)){
						// var fileExt = rec.oldName.substring(rec.oldName.lastIndexOf('.'), rec.oldName.length);
						if(rec.newName.indexOf(rec.fileExt) === (-1)){
							rec.newName = rec.newName + rec.fileExt;
						}
						newFileData.push(rec);
					}
				});

				var fileRenameResultList = [];

				angular.forEach(newFileData, function(rec, index){
					if(validation.isValidValue(rec.newName)){
						fs.rename(rec.parentPath + '/' + rec.oldName, rec.parentPath + '/' + rec.newName, function(err){
							if(err){
								rec['fileRenameResult']	= 'error';
								console.log(err);
							}else{
								rec['fileRenameResult']	= 'success';
								fileRenameResultList.push(rec.oldName);
							}
						});	
					}
				});

				var successMsg = 'File(s) has been renamed successfully.'

				// angular.forEach($scope.fileList, function(rec, i){
				// 	if(fileRenameResultList.indexOf(rec.oldName) !== (-1)){
				// 		$scope.fileList.splice(i,0);
				// 	}
				// });

				$scope.fileList = [];

				alert(successMsg);

				console.log(newFileData);
			}			
		}
	});