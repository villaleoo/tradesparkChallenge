class CapitalizeFieldsMixin:
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        for field, value in representation.items():
            if isinstance(value, str) and value:  
                representation[field] = value.capitalize()
        return representation