using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DesignPattern.StrategyPattern.Behaviors
{
    public interface IQuackBehavior
    {
        public void Quack();
    }

    public class Quack : IQuackBehavior
    {
        public void Quack()
        {
            Console.WriteLine("꽥");
        }
    }

    public class MuteQuack : IQuackBehavior
    {
        public void Quack()
        {
            Console.WriteLine("<< 조용~ >>");
        }
    }

    public class Squeak : IQuackBehavior
    {
        public void Quack()
        {
            Console.WriteLine("삑");
        }
    }
}
