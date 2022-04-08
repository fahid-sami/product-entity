export class ProductState {
    private states
    private currentState;
    public static readonly DRAFT_STATE = 'Draft';
    public static readonly AVAILABLE_STATE = 'Available';
    public static readonly EXPIRED_STATE = 'Expired';
    public static readonly DELETED_DRAFT_STATE = 'Deleted draft';
    public static readonly DELETED_STATE = 'Deleted';
    public static readonly RESERVED_STATE = 'Reserved';
    public static readonly SOLD_STATE = 'Sold';
    public static readonly RETURNED_STATE = 'Returned';
    public static readonly LISTING_DELETED_STATE = 'Listing deleted';
    public static readonly INVALID_STATE = 'Invalid state transfer request';
    constructor() {
        this.states = [new Draft(), new Available(), new Expired(), new DeletedDraft(), new Deleted(), new Reserved(), 
            new Sold(), new Returned(), new ListingDeleted()];
        this.currentState = this.states[0];
    }
  
    change(oldState: string, updatedState: string) {
        const updatedStateIndex = this.states.findIndex(item => item.state === updatedState);
        if (updatedStateIndex !== -1) {
            this.currentState = this.states[updatedStateIndex];
        } else {
            return ProductState.INVALID_STATE;
        }
        return this.changeState(oldState)
    }
  
    changeState(oldState: string) {
      return this.currentState.changeState(oldState);
    }
}
  
class State {
    state: string;
    validOldStates: string[];
    
    constructor(state: string) {
        this.state = state;
        this.validOldStates = [];
    }
}
  
class Draft extends State {
    validOldStates = [ProductState.RETURNED_STATE];
    constructor() {
        super(ProductState.DRAFT_STATE);
    }
  
    changeState(oldState: string) {
        return this.validOldStates.includes(oldState) ? ProductState.DRAFT_STATE : ProductState.INVALID_STATE;
    }
}
  
class Available extends State {
    validOldStates = [ProductState.EXPIRED_STATE, ProductState.RESERVED_STATE, ProductState.DRAFT_STATE];
    constructor() {
      super(ProductState.AVAILABLE_STATE);
    }
  
    changeState(oldState: string) {
        return this.validOldStates.includes(oldState) ? ProductState.AVAILABLE_STATE : ProductState.INVALID_STATE;
    }
}

class Expired extends State {
    validOldStates = [ProductState.AVAILABLE_STATE];
    constructor() {
      super(ProductState.EXPIRED_STATE);
    }
  
    changeState(oldState: string) {
        return this.validOldStates.includes(oldState) ? ProductState.EXPIRED_STATE : ProductState.INVALID_STATE;
    }
}

class DeletedDraft extends State {
    validOldStates = [ProductState.DRAFT_STATE];
    constructor() {
      super(ProductState.DELETED_DRAFT_STATE);
    }
  
    changeState(oldState: string) {
        return this.validOldStates.includes(oldState) ? ProductState.DELETED_DRAFT_STATE : ProductState.INVALID_STATE;
    }
}

class Deleted extends State {
    validOldStates = [ProductState.AVAILABLE_STATE, ProductState.RETURNED_STATE];
    constructor() {
      super(ProductState.DELETED_STATE);
    }
  
    changeState(oldState: string) {
        return this.validOldStates.includes(oldState) ? ProductState.DELETED_STATE : ProductState.INVALID_STATE;
    }
}

class Reserved extends State {
    validOldStates = [ProductState.AVAILABLE_STATE];
    constructor() {
      super(ProductState.RESERVED_STATE);
    }
  
    changeState(oldState: string) {
        return this.validOldStates.includes(oldState) ? ProductState.RESERVED_STATE : ProductState.INVALID_STATE;
    }
}

class Sold extends State {
    validOldStates = [ProductState.RESERVED_STATE];
    constructor() {
      super(ProductState.SOLD_STATE);
    }
  
    changeState(oldState: string) {
        return this.validOldStates.includes(oldState) ? ProductState.SOLD_STATE : ProductState.INVALID_STATE;
    }
}

class Returned extends State {
    validOldStates = [ProductState.SOLD_STATE];
    constructor() {
      super(ProductState.RETURNED_STATE);
    }
  
    changeState(oldState: string) {
        return this.validOldStates.includes(oldState) ? ProductState.RETURNED_STATE : ProductState.INVALID_STATE;
    }
}

class ListingDeleted extends State {
    validOldStates = [ProductState.SOLD_STATE, ProductState.DELETED_DRAFT_STATE, ProductState.DELETED_STATE, ProductState.EXPIRED_STATE];
    constructor() {
      super(ProductState.LISTING_DELETED_STATE);
    }
  
    changeState(oldState: string) {
        return this.validOldStates.includes(oldState) ? ProductState.LISTING_DELETED_STATE : ProductState.INVALID_STATE;
    }
}