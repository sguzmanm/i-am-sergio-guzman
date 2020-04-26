def set_bit(v, index, x):
   mask = 1 << index   # Compute mask, an integer with just bit 'index' set.
   v &= ~mask          # Clear the bit indicated by the mask (if x is False)
   if x:
     v |= mask         # If x was True, set the bit indicated by the mask.
   return v

ans=set_bit(163,0,False)
print ans