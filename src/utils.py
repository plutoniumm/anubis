probe = lambda k: print([i for i in dir(k) if not i.startswith('_')])
drill = lambda k: print([i for i in dir(k) if i.startswith('_')])