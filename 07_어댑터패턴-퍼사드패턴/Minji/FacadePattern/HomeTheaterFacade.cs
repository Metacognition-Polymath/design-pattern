using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DesignPattern.FacadePattern
{
    internal class HomeTheaterFacade
    {
		Amplifier amp;
		Tuner tuner;
		StreamingPlayer player;
		CdPlayer cd;
		Projector projector;
		TheaterLights lights;
		Screen screen;
		PopcornPopper popper;

		public HomeTheaterFacade(Amplifier amp,
					 Tuner tuner,
					 StreamingPlayer player,
					 Projector projector,
					 Screen screen,
					 TheaterLights lights,
					 PopcornPopper popper)
		{
			this.amp = amp;
			this.tuner = tuner;
			this.player = player;
			this.projector = projector;
			this.screen = screen;
			this.lights = lights;
			this.popper = popper;
		}

		public void WatchMovie(string movie)
		{
			Console.WriteLine("Get ready to watch a movie...");
			popper.On();
			popper.Pop();
			lights.Dim(10);
			screen.Down();
			projector.On();
			projector.WideScreenMode();
			amp.On();
			amp.SetStreamingPlayer(player);
			amp.SetSurroundSound();
			amp.SetVolume(5);
			player.On();
			player.Play(movie);
		}


		public void EndMovie()
		{
			Console.WriteLine("Shutting movie theater down...");
			popper.Off();
			lights.On();
			screen.Up();
			projector.Off();
			amp.Off();
			player.Stop();
			player.Off();
		}

		public void ListenToRadio(double frequency)
		{
			Console.WriteLine("Tuning in the airwaves...");
			tuner.On();
			tuner.SetFrequency(frequency);
			amp.On();
			amp.SetVolume(5);
			amp.SetTuner(tuner);
		}

		public void EndRadio()
		{
			Console.WriteLine("Shutting down the tuner...");
			tuner.Off();
			amp.Off();
		}
	}
}
