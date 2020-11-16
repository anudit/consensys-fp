### - Race Conditions - Reentrancy
use send() instead of call.value()

### - Cross-function Race Conditions
use internal function appropriately

### - Integer Overflow and Underflow
use SafeMath library to avoid overflow and underflow

### - Forcibly Sending Ether to a Contract
this smart project can receive any amount ether any time

### - Transaction-Ordering Dependence (TOD)
program logic does not affected by transactions order

### - Timestamp Dependence
program logic does not depende on block timestamp

### - DoS with (Unexpected) revert
no refund situation, so no DoS with unexpected revert

### - DoS with Block Gas Limit
no unknown size loop
