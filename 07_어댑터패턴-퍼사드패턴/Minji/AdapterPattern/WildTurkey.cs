using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DesignPattern.AdapterPattern
{
    internal class WildTurkey : ITurkey
    {
        public void Fly()
        {
            Console.WriteLine("짧은 거리를 날고 있어요!");
        }

        public void Gobble()
        {
            Console.WriteLine("골골");
        }
    }
}
