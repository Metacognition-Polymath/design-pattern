using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DesignPattern.AdapterPattern
{
    internal class MallardDuck : IDuck
    {
        public void Fly()
        {
            Console.WriteLine("날고 있어요!");
        }

        public void Quack()
        {
            Console.WriteLine("꽥");
        }
    }
}
