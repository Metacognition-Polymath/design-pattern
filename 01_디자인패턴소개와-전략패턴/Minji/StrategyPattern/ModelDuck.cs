using DesignPattern.StrategyPattern.Behaviors;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DesignPattern.StrategyPattern
{
    public class ModelDuck : Duck
    {
        public ModelDuck()
        {
            quackBehavior = new Quack();
            flyBehavior = new FlyNoWay();
        }

        public override void Display()
        {
            Console.WriteLine("저는 모형오리입니다.");
        }
    }
}
