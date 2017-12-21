import shutil, os
from pathlib import Path
import pathlib
import errno
import fileinput

#name = input("What's your name? ")
#type(name)

# print("Your name is %s" % name)
#os.chdir('D:\\test')
#shutil.copytree('D:\\test', 'D:\\test_copy')

#for folderName, subFolders, fileNames in os.walk('D:\\dev\\workspace\\android\\[del]-LittdroidTemplate\\app'):
#    print('Current Folder: %s' % folderName)

#    for subFolder in subFolders:
#        print('Sub Folder of %s : %s' % (folderName, subFolder))

#    for fileName in fileNames:
#        print('File inside %s : %s' %(folderName, fileName))

#    print('')

appName = input("You Application Name: ")
type(appName)

appPackage = input("Your Application Package: ")
type(appPackage)

print("AppName: %s" % appName)
print("AppPackage: %s" % appPackage)

def sourceRoot():
    return os.getcwd()

def mkdirnotex(path):
    os.makedirs(path, exist_ok=True)

def copy(src, dest):
    try:
        shutil.copytree(src, dest)
    except OSError as e:
        # If the error was caused because the source wasn't a directory
        if e.errno == errno.ENOTDIR:
            shutil.copy(src, dest)
        else:
            print('Directory not copied. Error: %s' % e)
		
def mkdirp(path):
    os.makedirs(path, exist_ok=True)

def createPath(directory):
    return Path(directory)

def prepareSourcePath(path):
    sourcePath =sourceRoot() + "/" + sourceProjectName + '/' + path
    sourcePath = sourcePath.replace("\\", "/")
    return sourcePath

def prepareDestinationPath(path):
    return appName + "/" + path

def startCopy(path):
    copy(prepareSourcePath(path), prepareDestinationPath(path))
	
def replaceFileContent(fileToSearch, textToSearch, textToReplace):
	with fileinput.FileInput(fileToSearch, inplace=True) as file:
		for line in file:
			print(line.replace(textToSearch, textToReplace), end='')
def startReplaceFileContent(filePath):
            fullFilePath = sourceRoot() + "/" + filePath
            fullFilePath = fullFilePath.replace("\\", "/")
            replaceFileContent(fullFilePath, sourcePackageName, appPackage)
            replaceFileContent(fullFilePath, sourceProjectName, appName)
    
			
sourceProjectName = "LittdroidTemplate"
sourcePackageName = "com.toelie.tools.littdroidtemplate"
sourcePackageDir = "com/toelie/tools/littdroidtemplate"
packageDir = appPackage.replace(".", "/")

#mkdirnotex(appName + '/app/src/androidTest/java/' + packageDir)
#mkdirnotex(appName + '/app/src/main/java/' + packageDir)
#mkdirnotex(appName + '/app/src/test/java/' + packageDir)

startCopy('gradle')
#startCopy('/app/src/main/java')
startCopy('/app/src/main/res')
startCopy('.gitignore')
startCopy('build.gradle')
startCopy('gradle.properties')
startCopy('gradlew')
startCopy('settings.gradle')
startCopy('app/.gitignore')
startCopy('app/proguard-rules.pro')
startCopy('app/build.gradle')
startCopy('app/src/main/AndroidManifest.xml')

copy(prepareSourcePath('/app/src/main/java') + "/" + sourcePackageDir, prepareDestinationPath('app/src/main/java') + "/" + packageDir)
copy(prepareSourcePath('/app/src/androidTest/java') + "/" + sourcePackageDir, prepareDestinationPath('app/src/androidTest/java') + "/" + packageDir)
copy(prepareSourcePath('/app/src/test/java') + "/" + sourcePackageDir, prepareDestinationPath('app/src/test/java') + "/" + packageDir)

template_array = ["app/build.gradle",
                "app/src/main/java",
                "app/src/androidTest/java/",
                "app/src/test/java/",
                "app/src/main/AndroidManifest.xml",
                "app/src/main/res/values",
                "app/src/main/res/values-v21",
                "app/src/main/res/layout"
                ]

for each_template in template_array:
    if os.path.isdir(prepareDestinationPath(each_template)):
        for folderName, subFolders, fileNames in os.walk(prepareDestinationPath(each_template)):
            #print('Current Folder: %s' % folderName)

            #for subFolder in subFolders:
                #print('Sub Folder of %s : %s' % (folderName, subFolder))

            for fileName in fileNames:
                startReplaceFileContent(folderName + "/" + fileName)

    else :
        startReplaceFileContent(prepareDestinationPath(each_template))
