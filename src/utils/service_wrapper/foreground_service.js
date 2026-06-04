import ReactNativeForegroundService from "@supersami/rn-foreground-service";
import { appUsageProcess } from "../../core/usage_evaluator";

export function setupForegroundService(){
  ReactNativeForegroundService.register({
    config: {
      alert: true,
      onServiceErrorCallBack: () => {
        console.error("Foreground service error occurred");
      },
    }
  })

  ReactNativeForegroundService.add_task(() => update(), {
    delay: 300000,
    onLoop: true,
    taskId: "appTracker",
    onError: (e) => console.log(`Error logging:`, e),
  });

  ReactNativeForegroundService.start({
    id: "appTracker",
    title: "Foreground Service",
    message: "We are live World",
    setOnlyAlertOnce: true,
    color: "#000000",
    progress: {
      max: 100,
      curr: 50,
    },
    ServiceType: "1",
  });
}



//the actual function that foreground service runs
export function update(){
  console.log("getting app usage");
  appUsageProcess();
}