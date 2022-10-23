using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DesignPattern.DecoratorPattern
{
    public abstract class CondimentDecorator : Beverage
    {
        protected Beverage beverage;

        public override void SetSize(BeverageSize size)
        {
            this.beverage.Size = size;
        }

        public CondimentDecorator(Beverage beverage)
        {
            this.beverage = beverage;
        }
    }

    public class Mocha : CondimentDecorator
    {
        public Mocha(Beverage beverage) : base(beverage) { }

        public override string GetDescription()
        {
            return beverage.GetDescription() + ", 모카";
        }

        public override double Cost()
        {
            switch (beverage.Size)
            {
                case BeverageSize.Grande:
                    return beverage.Cost() + 1.20;
                case BeverageSize.Venti:
                    return beverage.Cost() + 2.20;
            }

            return beverage.Cost() + .20;
        }
    }

    public class Whip : CondimentDecorator
    {
        public Whip(Beverage beverage) : base(beverage) { }

        public override string GetDescription()
        {
            return beverage.GetDescription() + ", 휘핑크림";
        }

        public override double Cost()
        {
            switch (beverage.Size)
            {
                case BeverageSize.Grande:
                    return beverage.Cost() + 1.14;
                case BeverageSize.Venti:
                    return beverage.Cost() + 2.14;
            }

            return beverage.Cost() + .14;
        }
    }

    public class Soy : CondimentDecorator
    {
        public Soy(Beverage beverage) : base(beverage) { }

        public override string GetDescription()
        {
            return beverage.GetDescription() + ", 두유";
        }

        public override double Cost()
        {
            switch (beverage.Size)
            {
                case BeverageSize.Grande:
                    return beverage.Cost() + 1.3;
                case BeverageSize.Venti:
                    return beverage.Cost() + 2.3;
            }

            return beverage.Cost() + .3;
        }
    }
}
