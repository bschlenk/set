# Set Design

## State Machine

Set will be controlled by a state machine with the following states:

* READY
* SET

### Ready

The ready state is the default state. The game is ready to recieve
input and act on that input.

### Set

A player has pressed the "declare set" button. The game is ready to be told
which cards belong to the set. This state is timed, and if time runs out
the state will switch back to READY.

During this state, the player must select the 3 cards that belong to the
set. After 3 cards are selected, they are verified and the player gets
one point. If the 3 cards are not a part of a set, or if 3 cards aren't
chosen in time, the player loses a point.

## Turn Changing

After a set is declared and verified, those cards are replaced with 3 new
cards. These could be animated in, or just replace the cards.

## Zero Moves

At any time, the players can decide whether they think there are any
sets left on the board. This is regardless of whether there are *actually*
any sets left. They initiate this by holding the Q key for 3 seconds.
This adds 3 more cards to the board. The board must expand to accommodate
these 3 new cards.
