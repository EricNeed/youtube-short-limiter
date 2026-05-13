import ReactNativeForegroundService from "@supersami/rn-foreground-service";

ReactNativeForegroundService.register({
  config: {
    alert: true,
    onServiceErrorCallBack: () => {
      console.error("Foreground service error occurred");
    },
  }
})


ReactNativeForegroundService.add_task(() => update(), {
  delay: 1000,
  onLoop: true,
  taskId: "taskid",
  onError: (e) => console.log(`Error logging:`, e),
});


export function placeHolderForegroundService(){
    console.log("hi");
}