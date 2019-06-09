interface Subject {
    observers:Observer[]
    subscribe(o:Observer):void
    unsubscribe(o:Observer):void
    // message(o:Observer):void 
}
