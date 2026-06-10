import ReactNativeForegroundService from "@supersami/rn-foreground-service";
import { appUsageProcess } from "../../core/usage_evaluator";
import { usageTaskDefaultConfig } from "../settings/the_ultimate_circular_deps_solver";

export function setupForegroundService(){
  ReactNativeForegroundService.register({
    config: {
      alert: true,
      onServiceErrorCallBack: () => {
        console.error("Foreground service error occurred");
      },
    }
  })

  ReactNativeForegroundService.add_task(() => update(), usageTaskDefaultConfig);

  ReactNativeForegroundService.start({
    id: 1123,//never change this to a string again 
    title: "Foreground Service",
    icon: "../../../../storge/assets/thumbnail_low_res.png",
    largeIcon: "../../../../storge/assets/thumbnail_low_res.png",
    message: "We are live World",
    setOnlyAlertOnce: true,
    color: "#000000",
    ServiceType: "1",
  });
}




//the actual function that foreground service runs
export function update(){
  console.log("getting app usage");
  appUsageProcess();
}