using DesignPattern.StrategyPattern.Behaviors;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DesignPattern.StrategyPattern
{
    public abstract class Duck
    {
        protected IFlyBehavior flyBehavior;
        protected IQuackBehavior quackBehavior;

        public Duck() { }

        public abstract void Display();

        public void SetFlyBehavior(IFlyBehavior behavior)
        {
            flyBehavior = behavior;
        }

        public void SetQuackBehavior(IQuackBehavior behavior)
        {
            quackBehavior = behavior;
        }

        public void PerformFly()
        {
            flyBehavior.Fly();
        }

        public void PerformQuack()
        {
            quackBehavior.Quack();
        }

        public void Swim()
        {
            Console.WriteLine("모든 오리는 물에 뜹니다. 가짜 오리도 뜨죠.");
        }
    }
}
