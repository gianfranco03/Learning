using System;

namespace classes
{
  class Program
  {
    static void Main(string[] args)
    {
      var account = new BankAccount("Cristian", 1000);
      account.MakeWithdrawal(500, DateTime.Now, "Rent payment");
      // Console.WriteLine("Balance " + account.Balance);
      account.MakeDeposit(100, DateTime.Now, "Friend paid me back");
      // Console.WriteLine("Balance " + account.Balance);

      Console.WriteLine(account.GetAccountHistory());
    }
  }
}
