import Cmd, { Color, SpawnOptions } from "cmdmodule";

const wd: SpawnOptions = {
  workingDirectory: "./Website",
};

const cmd = new Cmd.Module({
  prompt: `${Color.BgMagenta}Lernkartei-CLI${Color.Reset}${Color.BgWhite}=>${Color.Reset}`,
  commands: {
    testArg: {
      invoke: (self, args) => {
        self.print(args[0]);
      },
    },
    echo: {
      invoke: (self, args) => {
        self.print(args[0]);
      },
    },
    run: {
      invoke: (self, args) => {
        self.spawn(
          "npm",
          ["run", args[0]],
          wd
        )((code) => {
          cmd.rl.prompt();
        });
      },
    },
    add: {
      invoke: (self, args) => {
        self.spawn(
          "npm",
          ["add", args[0]],
          wd
        )((code) => {
          cmd.rl.prompt();
        });
      },
    },
  },

  //   defaultHandler: () =>{

  //   }
});

// Build the shell
cmd.run();
