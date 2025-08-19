import pytest

@pytest.fixture(scope="session")
def browser_type_launch_options(request):
    return {"headless": True}
