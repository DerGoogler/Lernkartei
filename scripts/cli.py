import subprocess
import sys
import cmd
import re
import os

os.environ['SYSTEMD_COLORS'] = '1'

def shellWebsite(arg, stdout):
    with open('./__pycache__/test.log', 'wb') as f:
        process = subprocess.Popen(
            arg, stdout=subprocess.PIPE, cwd=r'./Website')
        for c in iter(lambda: process.stdout.read(1), b''):
            # sys.stdout.buffer.write(c)
            stdout.stdout.write(c.decode("utf-8"))
            f.write(c)


class CLI(cmd.Cmd):
    prompt = '\033[95m' + 'Lernkatei-CLI' + '\033[00m\033[94m$\033[00m '
    intro = "Welcome! Type ? to list commands\n\033[93mWARNING!\033[0m You may need \033[1mbun\033[0m to use this CLI. Visit http://bun.sh to lean more."

    def do_add(self, arg):
        l = arg.split()
        if len(l) != 1:
            self.stdout.write('Missing package\n')
        else:
            shellWebsite(["bun", "add", arg], self)

    def help_add(self):
        self.stdout.write("""
        Always do "add googlers-tools", not "add googlers-tools-tools -d" or "add -d googlers-tools-tools"
        \n""")

    def do_remove(self, arg):
        l = arg.split()
        if len(l) != 1:
            self.stdout.write('Missing package\n')
        else:
            shellWebsite(["bun", "remove", arg], self)

    def do_addDev(self, arg):
        l = arg.split()
        if len(l) != 1:
            self.stdout.write('Missing package\n')
        else:
            shellWebsite(["bun", "add", "-d", arg], self)

    def do_run(self, arg):
        l = arg.split()
        if len(l) != 1:
            self.stdout.write('Missing script\n')
        else:
            shellWebsite(["bun", "run", arg], self)

    def do_exit(self, arg):
        self.stdout.write('Bye\n')
        return True

    def default(self, line):
        if line == 'x' or line == 'q':
            return self.do_exit(line)
        self.stdout.write('%s is unknown\n' % line)


if __name__ == '__main__':
    CLI().cmdloop()
