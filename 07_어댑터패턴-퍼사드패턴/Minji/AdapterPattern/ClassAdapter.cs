using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DesignPattern.AdapterPattern
{
    internal class ClassAdapter : WildTurkey, IDuck
    {
        public void Quack()
        {
            Gobble();
        }
    }
}
