import "frida-il2cpp-bridge";

console.log("Frida Loaded Successfully");

Il2Cpp.perform(function () {
  // Get the image of Assembly-CSharp.dll
  const AssemblyCSharp = Il2Cpp.domain.assembly("Assembly-CSharp").image;

  // Get the TransactionManager class from the Assembly-CSharp
  const TransactionManager = AssemblyCSharp.class("ArchitectureImplement.Managers.TransactionManager");

  // Trace the calls from the TransactionManager class
  // Il2Cpp.trace(true).classes(TransactionManager).and().attach();

  // Get virtual address of a function
  const GetCoins = TransactionManager.method("GetCoins");

  // Hook GetCoins
  GetCoins.implementation = function () : number {
    // Call the original function
    //console.log("GetCoins Hook Called");
    //const coins = this.method<number>("GetCoins").invoke();

    //console.log(`You have ${coins} coins`);

    const newCoins = 99999999;
    console.log(`Returning '${newCoins} coins' instead`);
    return newCoins;
  };

  const GetGems = TransactionManager.method("GetGems");

  // Hook GetGems
  GetGems.implementation = function () : number {
    console.log("GetGems Hook Called");

    // Call the original function
    //console.log("GetGems Hook Called");
    //const gems = this.method<number>("GetGems").invoke();

    //console.log(`You have ${gems} gems`);

    const newGems = 99999999;
    console.log(`Returning '${newGems} gems' instead`);
    return newGems;
  };

  // NOTE: We're only spoofing the value of coins and gems with the hooks above.
  // Buying things will work, but once we unhook, we will have a negative balance.
  // To fix that, we can hook 'SetCoins' and 'SetGems' so that they always set those
  // to '99999999'.

  /*
  const SetCoins = TransactionManager.method("SetCoins");
  const SetGems = TransactionManager.method("SetGems");

  console.log(SetCoins);
  console.log(SetGems);

  // Call the methods so they update the currency values
  SetCoins.invoke(999999);
  SetGems.invoke(999999);

  // Hook the setter methods
  SetCoins.implementation = function (expectedValue : number) : void {
    console.log("Setting coins to 99999999");
    this.method<void>("SetCoins").invoke(99999999);
  };

  SetGems.implementation = function (expectedValue : number) : void {
    console.log("Setting gems to 99999999");
    this.method<void>("SetGems").invoke(99999999);
  };
  */


  // Disable damage
  const PlayerHealth = AssemblyCSharp.class("Game.PlayerComponents.PlayerHealth");
  const TakeDamage = PlayerHealth.method("TakeDamage");

  Il2Cpp.trace(true).methods(TakeDamage).and().attach();
});