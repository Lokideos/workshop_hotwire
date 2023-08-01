// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo";
import "@turbo-boost/commands";
import "turbo-morphdom";
import "controllers";
import TurboPower from 'turbo_power'
import { createCable } from "@anycable/web";
import { start } from "@anycable/turbo-stream";

TurboPower.initialize(Turbo.StreamActions)

const logLevel = document.documentElement.classList.contains("debug")
  ? "debug"
  : "error";

const cable = createCable({
  protocol: "actioncable-v1-ext-json",
  logLevel,
});

start(cable);
