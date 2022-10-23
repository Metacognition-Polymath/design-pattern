using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DesignPattern.DecoratorPattern
{
    public enum BeverageSize { Tall, Grande, Venti };

    public abstract class Beverage
    {
        protected string description = "";
        public BeverageSize Size { get; set; } = BeverageSize.Tall;

        public virtual void SetSize(BeverageSize size)
        {
            this.Size = size;
        }

        public virtual string GetDescription()
        {
            return $"({Size.ToString()}) {description}";
        }

        public abstract double Cost();
    }

    public class Espresso : Beverage
    {
        public Espresso()
        {
            this.description = "에스프레소";
        }

        public override double Cost()
        {
            switch (Size)
            {
                case BeverageSize.Grande:
                    return 2.99;
                case BeverageSize.Venti:
                    return 3.99;
            }

            return 1.99;
        }
    }

    public class HouseBlend : Beverage
    {
        public HouseBlend()
        {
            this.description = "하우스 블렌드 커피";
        }

        public override double Cost()
        {
            switch (Size)
            {
                case BeverageSize.Grande:
                    return 1.89;
                case BeverageSize.Venti:
                    return 2.89;
            }

            return .89;
        }
    }

    public class DarkRoast : Beverage
    {
        public DarkRoast()
        {
            this.description = "다크 로스트 커피";
        }

        public override double Cost()
        {
            switch (Size)
            {
                case BeverageSize.Grande:
                    return 1.90;
                case BeverageSize.Venti:
                    return 2.90;
            }

            return .90;
        }
    }
}
