

//just put stuff here if it is shared between 2 scripts that also imported each other

export const usageTaskDefaultConfig = {
  // delay: 300000,
  delay: 60000,
  onLoop: true,
  taskId: "prseUsageEvent",
  onError: (e) => console.log(`Error logging:`, e),
}