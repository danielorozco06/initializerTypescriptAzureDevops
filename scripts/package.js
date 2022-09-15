const exec = require('child_process').execSync;
const rimraf = require('rimraf');
const fs = require('fs');
const path = require('path');

/**
 * Package tasks.
 */

function packageTasks() {
  fs.readdir('tasks', (err, files) => {
    files.forEach(taskName => {
      let taskDir = path.join('tasks', taskName);
      // If a package.json is missing, npm will exec the install command on the parent folder. This will cause an endless install loop.
      if (fs.existsSync(path.join(taskDir, 'package.json'))) {
        packageTask(taskDir);
      } else {
        fs.readdir(taskDir, (err, taskVersionDirs) => {
          taskVersionDirs.forEach(versToBuild => {
            let taskVersionDir = path.join(taskDir, versToBuild);
            if (fs.existsSync(path.join(taskVersionDir, 'package.json'))) {
              packageTask(taskVersionDir);
            }
          });
        });
      }
    });
  });
}

/**
 * Copy directory and execute npm command.
 * @param taskDir - (String) - The command to execute, i.e. install, pack, etc.
 * @param element - (String) - Current working directory.
 */
function copySources(taskDir, element) {
  let source = path.join(taskDir, element);
  let destination = path.join('dist', taskDir, element);
  fs.copyFileSync(source, destination);
}

/**
 * Clean files.
 * @param cwd - (String) - Current working directory.
 */
function cleanMap(taskDir) {
  rimraf.sync(path.join(taskDir, '*.map'));
}

/**
 * execute npm command.
 * @param command - (String) - The command to execute, i.e. install, pack, etc.
 * @param cwd - (String) - Current working directory.
 */
function execNpm(command, cwd) {
  exec(
    'npm ' +
      command +
      ' -q' +
      ' --only=production' +
      ' --registry=https://artifactory.apps.bancolombia.com/api/npm/npm-bancolombia/',
    { cwd: cwd, stdio: [0, 1, 2] }
  );
}

/**
 * execute login of package.
 * @param taskDir - (String) - Current working directory.
 */
function packageTask(taskDir) {
  copySources(taskDir, 'icon.png');
  copySources(taskDir, 'task.json');
  copySources(taskDir, 'package.json');
  let taskPackage = path.join('dist', taskDir);
  cleanMap(taskPackage);
  execNpm('i', taskPackage);
}

packageTasks();
