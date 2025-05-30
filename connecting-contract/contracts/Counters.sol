// SPDX-License-Identifier: MIT
    // OpenZeppelin Contracts (last updated v5.0.0) (utils/Counters.sol)

    pragma solidity ^0.8.20;

    /**
     * @title Counters
     * @author Matt Condon (@shrugs)
     * @dev Provides counters that can only be incremented, decremented or reset. This can be used e.g. to track the number
     * of elements in a mapping, issuing ERC721 ids, or counting request ids.
     *
     * Include with `using Counters for Counters.Counter;`
     */
    library Counters {
        struct Counter {
            // This variable should never be directly accessed by users of the library: interactions must be restricted to
            // the library's function. As of Solidity v0.5.2, this cannot be enforced, though there is a proposal to add
            // this feature: see https://github.com/ethereum/solidity/issues/4637
            uint256 _value; // default: 0
        }

        /**
         * @dev Returns the current value of the counter.
         */
        function current(Counter storage counter) internal view returns (uint256) {
            return counter._value;
        }

        /**
         * @dev Increments the counter by one.
         */
        function increment(Counter storage counter) internal {
            unchecked {
                counter._value += 1;
            }
        }

        /**
         * @dev Decrements the counter by one.
         *
         * Counter._value must be greater than 0.
         */
        function decrement(Counter storage counter) internal {
            uint256 value = counter._value;
            require(value > 0, "Counter: decrement overflow");
            unchecked {
                counter._value = value - 1;
            }
        }

        /**
         * @dev Resets the counter to zero.
         */
        function reset(Counter storage counter) internal {
            counter._value = 0;
        }
    }